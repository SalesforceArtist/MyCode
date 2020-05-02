(function (lwc) {
    'use strict';

    /**
     * Copyright (C) 2018 salesforce.com, inc.
     */

    /**
     * Copyright (C) 2018 salesforce.com, inc.
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function invariant(value, msg) {
      if (!value) {
        throw new Error(`Invariant Violation: ${msg}`);
      }
    }

    function isTrue(value, msg) {
      if (!value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }

    function isFalse(value, msg) {
      if (value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }

    function fail(msg) {
      throw new Error(msg);
    }

    var assert =
    /*#__PURE__*/
    Object.freeze({
      invariant: invariant,
      isTrue: isTrue,
      isFalse: isFalse,
      fail: fail
    });
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * In IE11, symbols are expensive.
     * Due to the nature of the symbol polyfill. This method abstract the
     * creation of symbols, so we can fallback to string when native symbols
     * are not supported. Note that we can't use typeof since it will fail when transpiling.
     */

    const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';
    /** version: 1.1.13-224.7 */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // key in engine service context for wire service context

    const CONTEXT_ID = '@wire'; // key in wire service context for updated listener metadata

    const CONTEXT_UPDATED = 'updated'; // key in wire service context for connected listener metadata

    const CONTEXT_CONNECTED = 'connected'; // key in wire service context for disconnected listener metadata

    const CONTEXT_DISCONNECTED = 'disconnected'; // wire event target life cycle connectedCallback hook event type

    const CONNECT = 'connect'; // wire event target life cycle disconnectedCallback hook event type

    const DISCONNECT = 'disconnect'; // wire event target life cycle config changed hook event type

    const CONFIG = 'config';
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Detects property changes by installing setter/getter overrides on the component
     * instance.
     *
     * TODO - in 216 engine will expose an 'updated' callback for services that is invoked
     * once after all property changes occur in the event loop.
     */

    /**
     * Invokes the provided change listeners with the resolved component properties.
     * @param configListenerMetadatas List of config listener metadata (config listeners and their context)
     * @param paramValues Values for all wire adapter config params
     */

    function invokeConfigListeners(configListenerMetadatas, paramValues) {
      configListenerMetadatas.forEach(metadata => {
        const {
          listener,
          statics,
          reactives
        } = metadata;
        const reactiveValues = Object.create(null);

        if (reactives) {
          const keys = Object.keys(reactives);

          for (let j = 0, jlen = keys.length; j < jlen; j++) {
            const key = keys[j];
            const value = paramValues[reactives[key]];
            reactiveValues[key] = value;
          }
        } // TODO - consider read-only membrane to enforce invariant of immutable config


        const config = Object.assign({}, statics, reactiveValues);
        listener.call(undefined, config);
      });
    }
    /**
     * Marks a reactive parameter as having changed.
     * @param cmp The component
     * @param reactiveParameter Reactive parameter that has changed
     * @param configContext The service context
     */


    function updated(cmp, reactiveParameter, configContext) {
      if (!configContext.mutated) {
        configContext.mutated = new Set(); // collect all prop changes via a microtask

        Promise.resolve().then(updatedFuture.bind(undefined, cmp, configContext));
      }

      configContext.mutated.add(reactiveParameter);
    }

    function updatedFuture(cmp, configContext) {
      const uniqueListeners = new Set(); // configContext.mutated must be set prior to invoking this function

      const mutated = configContext.mutated;
      delete configContext.mutated;
      mutated.forEach(reactiveParameter => {
        const value = getReactiveParameterValue(cmp, reactiveParameter);

        if (configContext.values[reactiveParameter.reference] === value) {
          return;
        }

        configContext.values[reactiveParameter.reference] = value;
        const listeners = configContext.listeners[reactiveParameter.head];

        for (let i = 0, len = listeners.length; i < len; i++) {
          uniqueListeners.add(listeners[i]);
        }
      });
      invokeConfigListeners(uniqueListeners, configContext.values);
    }
    /**
     * Gets the value of an @wire reactive parameter.
     * @param cmp The component
     * @param reactiveParameter The parameter to get
     */


    function getReactiveParameterValue(cmp, reactiveParameter) {
      let value = cmp[reactiveParameter.head];

      if (!reactiveParameter.tail) {
        return value;
      }

      const segments = reactiveParameter.tail;

      for (let i = 0, len = segments.length; i < len && value != null; i++) {
        const segment = segments[i];

        if (typeof value !== 'object' || !(segment in value)) {
          return undefined;
        }

        value = value[segment];
      }

      return value;
    }
    /**
     * Installs setter override to trap changes to a property, triggering the config listeners.
     * @param cmp The component
     * @param reactiveParameter Reactive parameter that defines the property to monitor
     * @param configContext The service context
     */


    function installTrap(cmp, reactiveParameter, configContext) {
      const callback = updated.bind(undefined, cmp, reactiveParameter, configContext);
      const newDescriptor = getOverrideDescriptor(cmp, reactiveParameter.head, callback);
      Object.defineProperty(cmp, reactiveParameter.head, newDescriptor);
    }
    /**
     * Finds the descriptor of the named property on the prototype chain
     * @param target The target instance/constructor function
     * @param propName Name of property to find
     * @param protoSet Prototypes searched (to avoid circular prototype chains)
     */


    function findDescriptor(target, propName, protoSet) {
      protoSet = protoSet || [];

      if (!target || protoSet.indexOf(target) > -1) {
        return null; // null, undefined, or circular prototype definition
      }

      const descriptor = Object.getOwnPropertyDescriptor(target, propName);

      if (descriptor) {
        return descriptor;
      }

      const proto = Object.getPrototypeOf(target);

      if (!proto) {
        return null;
      }

      protoSet.push(target);
      return findDescriptor(proto, propName, protoSet);
    }
    /**
     * Gets a property descriptor that monitors the provided property for changes
     * @param cmp The component
     * @param prop The name of the property to be monitored
     * @param callback A function to invoke when the prop's value changes
     * @return A property descriptor
     */


    function getOverrideDescriptor(cmp, prop, callback) {
      const descriptor = findDescriptor(cmp, prop);
      let enumerable;
      let get;
      let set; // This does not cover the override of existing descriptors at the instance level
      // and that's ok because eventually we will not need to do any of these :)

      if (descriptor === null || descriptor.get === undefined && descriptor.set === undefined) {
        let value = cmp[prop];
        enumerable = true;

        get = function () {
          return value;
        };

        set = function (newValue) {
          value = newValue;
          callback();
        };
      } else {
        const {
          set: originalSet,
          get: originalGet
        } = descriptor;
        enumerable = descriptor.enumerable;

        set = function (newValue) {
          if (originalSet) {
            originalSet.call(cmp, newValue);
          }

          callback();
        };

        get = function () {
          return originalGet ? originalGet.call(cmp) : undefined;
        };
      }

      return {
        set,
        get,
        enumerable,
        configurable: true
      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const ValueChangedEventType = 'ValueChangedEvent';
    /**
     * Event fired by wire adapters to emit a new value.
     */

    class ValueChangedEvent {
      constructor(value) {
        this.type = ValueChangedEventType;
        this.value = value;
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const LinkContextEventType = 'LinkContextEvent';
    /**
     * Event fired by wire adapters to link to a context provider
     */

    class LinkContextEvent {
      constructor(uid, callback) {
        this.type = LinkContextEventType;
        this.uid = uid;
        this.callback = callback;
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function removeListener(listeners, toRemove) {
      const idx = listeners.indexOf(toRemove);

      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    }

    function removeConfigListener(configListenerMetadatas, toRemove) {
      for (let i = 0, len = configListenerMetadatas.length; i < len; i++) {
        if (configListenerMetadatas[i].listener === toRemove) {
          configListenerMetadatas.splice(i, 1);
          return;
        }
      }
    }

    function buildReactiveParameter(reference) {
      if (!reference.includes('.')) {
        return {
          reference,
          head: reference
        };
      }

      const segments = reference.split('.');
      return {
        reference,
        head: segments.shift(),
        tail: segments
      };
    }

    class WireEventTarget {
      constructor(cmp, def, context, wireDef, wireTarget) {
        this._cmp = cmp;
        this._def = def;
        this._context = context;
        this._wireDef = wireDef;
        this._wireTarget = wireTarget;
      }

      addEventListener(type, listener) {
        switch (type) {
          case CONNECT:
            {
              const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];

              if (process.env.NODE_ENV !== 'production') {
                assert.isFalse(connectedListeners.includes(listener), 'must not call addEventListener("connect") with the same listener');
              }

              connectedListeners.push(listener);
              break;
            }

          case DISCONNECT:
            {
              const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];

              if (process.env.NODE_ENV !== 'production') {
                assert.isFalse(disconnectedListeners.includes(listener), 'must not call addEventListener("disconnect") with the same listener');
              }

              disconnectedListeners.push(listener);
              break;
            }

          case CONFIG:
            {
              const reactives = this._wireDef.params;
              const statics = this._wireDef.static;
              let reactiveKeys; // no reactive parameters. fire config once with static parameters (if present).

              if (!reactives || (reactiveKeys = Object.keys(reactives)).length === 0) {
                const config = statics || Object.create(null);
                listener.call(undefined, config);
                return;
              }

              const configListenerMetadata = {
                listener,
                statics,
                reactives
              }; // setup listeners for all reactive parameters

              const configContext = this._context[CONTEXT_ID][CONTEXT_UPDATED];
              reactiveKeys.forEach(key => {
                const reactiveParameter = buildReactiveParameter(reactives[key]);
                let configListenerMetadatas = configContext.listeners[reactiveParameter.head];

                if (!configListenerMetadatas) {
                  configListenerMetadatas = [configListenerMetadata];
                  configContext.listeners[reactiveParameter.head] = configListenerMetadatas;
                  installTrap(this._cmp, reactiveParameter, configContext);
                } else {
                  configListenerMetadatas.push(configListenerMetadata);
                } // enqueue to pickup default values


                updated(this._cmp, reactiveParameter, configContext);
              });
              break;
            }

          default:
            throw new Error(`unsupported event type ${type}`);
        }
      }

      removeEventListener(type, listener) {
        switch (type) {
          case CONNECT:
            {
              const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];
              removeListener(connectedListeners, listener);
              break;
            }

          case DISCONNECT:
            {
              const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];
              removeListener(disconnectedListeners, listener);
              break;
            }

          case CONFIG:
            {
              const paramToConfigListenerMetadata = this._context[CONTEXT_ID][CONTEXT_UPDATED].listeners;
              const reactives = this._wireDef.params;

              if (reactives) {
                Object.keys(reactives).forEach(key => {
                  const reactiveParameter = buildReactiveParameter(reactives[key]);
                  const configListenerMetadatas = paramToConfigListenerMetadata[reactiveParameter.head];

                  if (configListenerMetadatas) {
                    removeConfigListener(configListenerMetadatas, listener);
                  }
                });
              }

              break;
            }

          default:
            throw new Error(`unsupported event type ${type}`);
        }
      }

      dispatchEvent(evt) {
        if (evt instanceof ValueChangedEvent) {
          const value = evt.value;

          if (this._wireDef.method) {
            this._cmp[this._wireTarget](value);
          } else {
            this._cmp[this._wireTarget] = value;
          }

          return false; // canceling signal since we don't want this to propagate
        } else if (evt instanceof LinkContextEvent) {
          const {
            uid,
            callback
          } = evt; // This event is responsible for connecting the host element with another
          // element in the composed path that is providing contextual data. The provider
          // must be listening for a special dom event with the name corresponding to `uid`,
          // which must remain secret, to guarantee that the linkage is only possible via
          // the corresponding wire adapter.

          const internalDomEvent = new CustomEvent(uid, {
            bubbles: true,
            composed: true,

            // avoid leaking the callback function directly to prevent a side channel
            // during the linking phase to the context provider.
            detail(...args) {
              callback(...args);
            }

          });

          this._cmp.dispatchEvent(internalDomEvent);

          return false; // canceling signal since we don't want this to propagate
        } else if (evt.type === 'WireContextEvent') {
          // TODO: issue #1357 - remove this branch
          return this._cmp.dispatchEvent(evt);
        } else {
          throw new Error(`Invalid event ${evt}.`);
        }
      }

    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // wire adapters: wire adapter id => adapter ctor


    const adapterFactories = new Map();
    /**
     * Invokes the specified callbacks.
     * @param listeners functions to call
     */

    function invokeListener(listeners) {
      for (let i = 0, len = listeners.length; i < len; ++i) {
        listeners[i].call(undefined);
      }
    }
    /**
     * The wire service.
     *
     * This service is registered with the engine's service API. It connects service
     * callbacks to wire adapter lifecycle events.
     */


    const wireService = {
      wiring: (cmp, data, def, context) => {
        const wireContext = context[CONTEXT_ID] = Object.create(null);
        wireContext[CONTEXT_CONNECTED] = [];
        wireContext[CONTEXT_DISCONNECTED] = [];
        wireContext[CONTEXT_UPDATED] = {
          listeners: {},
          values: {}
        }; // engine guarantees invocation only if def.wire is defined

        const wireStaticDef = def.wire;
        const wireTargets = Object.keys(wireStaticDef);

        for (let i = 0, len = wireTargets.length; i < len; i++) {
          const wireTarget = wireTargets[i];
          const wireDef = wireStaticDef[wireTarget];
          const adapterFactory = adapterFactories.get(wireDef.adapter);

          if (process.env.NODE_ENV !== 'production') {
            assert.isTrue(wireDef.adapter, `@wire on "${wireTarget}": adapter id must be truthy`);
            assert.isTrue(adapterFactory, `@wire on "${wireTarget}": unknown adapter id: ${String(wireDef.adapter)}`); // enforce restrictions of reactive parameters

            if (wireDef.params) {
              Object.keys(wireDef.params).forEach(param => {
                const prop = wireDef.params[param];
                const segments = prop.split('.');
                segments.forEach(segment => {
                  assert.isTrue(segment.length > 0, `@wire on "${wireTarget}": reactive parameters must not be empty`);
                });
                assert.isTrue(segments[0] !== wireTarget, `@wire on "${wireTarget}": reactive parameter "${segments[0]}" must not refer to self`); // restriction for dot-notation reactive parameters

                if (segments.length > 1) {
                  // @wire emits a stream of immutable values. an emit sets the target property; it does not mutate a previously emitted value.
                  // restricting dot-notation reactive parameters to reference other @wire targets makes trapping the 'head' of the parameter
                  // sufficient to observe the value change.
                  assert.isTrue(wireTargets.includes(segments[0]) && wireStaticDef[segments[0]].method !== 1, `@wire on "${wireTarget}": dot-notation reactive parameter "${prop}" must refer to a @wire property`);
                }
              });
            }
          }

          if (adapterFactory) {
            const wireEventTarget = new WireEventTarget(cmp, def, context, wireDef, wireTarget);
            adapterFactory({
              dispatchEvent: wireEventTarget.dispatchEvent.bind(wireEventTarget),
              addEventListener: wireEventTarget.addEventListener.bind(wireEventTarget),
              removeEventListener: wireEventTarget.removeEventListener.bind(wireEventTarget)
            });
          }
        }
      },
      connected: (cmp, data, def, context) => {
        let listeners;

        if (process.env.NODE_ENV !== 'production') {
          assert.isTrue(!def.wire || context[CONTEXT_ID], 'wire service was not initialized prior to component creation:  "connected" service hook invoked without necessary context');
        }

        if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_CONNECTED])) {
          return;
        }

        invokeListener(listeners);
      },
      disconnected: (cmp, data, def, context) => {
        let listeners;

        if (process.env.NODE_ENV !== 'production') {
          assert.isTrue(!def.wire || context[CONTEXT_ID], 'wire service was not initialized prior to component creation:  "disconnected" service hook invoked without necessary context');
        }

        if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_DISCONNECTED])) {
          return;
        }

        invokeListener(listeners);
      }
    };
    /**
     * Registers the wire service.
     */

    function registerWireService(registerService) {
      registerService(wireService);
    }
    /** version: 1.1.13-224.7 */

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".c-container" + shadowSelector + " {border: 1px solid #d8dde6;margin: 10px 0 20px 0;}\n.large" + shadowSelector + " {height: 200px;}\n.x-large" + shadowSelector + " {height: 300px;}\n.custom-box" + shadowSelector + " {text-align: center;background-color: #f4f6f9;padding: 1rem;border: 1px solid #d8dde6;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        classMap: {
          "slds-slot": true
        },
        key: 0
      }, [], $slotset)];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = [""];
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-layout_layout-host",
      shadowAttribute: "lightning-layout_layout"
    };

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }
    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(window.safari); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(safari) {
      // via https://stackoverflow.com/a/9851769
      return safari && safari.pushNotification && safari.pushNotification.toString() === '[object SafariRemoteNotification]';
    }

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    const HALIN_CLASS = {
      center: 'slds-grid_align-center',
      space: 'slds-grid_align-space',
      spread: 'slds-grid_align-spread',
      end: 'slds-grid_align-end'
    };
    const VALIN_CLASS = {
      start: 'slds-grid_vertical-align-start',
      center: 'slds-grid_vertical-align-center',
      end: 'slds-grid_vertical-align-end',
      stretch: 'slds-grid_vertical-stretch'
    };
    const BOUNDARY_CLASS = {
      small: 'slds-grid_pull-padded',
      medium: 'slds-grid_pull-padded-medium',
      large: 'slds-grid_pull-padded-large'
    };
    const VERTICAL_ALIGN = Object.keys(VALIN_CLASS);
    const BOUNDARY = Object.keys(BOUNDARY_CLASS);
    const HORIZONTAL_ALIGN = Object.keys(HALIN_CLASS);
    const ROWS_CLASS = 'slds-wrap';
    const GRID_CLASS = 'slds-grid';
    function normalizeParam(value, valid, fallback) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: fallback || ' ',
        validValues: valid || []
      });
    }
    function computeLayoutClass(hAlign, vAlign, boundary, multiRows) {
      const computedClass = classSet(GRID_CLASS);

      if (hAlign !== ' ' && HALIN_CLASS[hAlign]) {
        computedClass.add(HALIN_CLASS[hAlign]);
      }

      if (vAlign !== ' ' && VALIN_CLASS[vAlign]) {
        computedClass.add(VALIN_CLASS[vAlign]);
      }

      if (boundary !== ' ' && BOUNDARY_CLASS[boundary]) {
        computedClass.add(BOUNDARY_CLASS[boundary]);
      }

      if (multiRows) {
        computedClass.add(ROWS_CLASS);
      }

      return computedClass;
    }

    /**
     * Represents a responsive grid system for arranging containers on a page.
     */

    class LightningLayout extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._horizontalAlign = void 0;
        this._verticalAlign = void 0;
        this._pullToBoundary = void 0;
        this._multipleRows = void 0;
        this._layoutClass = [];
      }

      /**
       * Determines how to spread the layout items horizontally.
       * The alignment options are center, space, spread, and end.
       * @type {string}
       * @default
       */
      get horizontalAlign() {
        return this._horizontalAlign;
      }

      set horizontalAlign(value) {
        this._horizontalAlign = normalizeParam(value, HORIZONTAL_ALIGN);
        this.updateClassList();
      }

      /**
       * Determines how to align the layout items vertically in the container.
       * The alignment options are start, center, end, and stretch.
       * @type {string}
       * @default
       */
      get verticalAlign() {
        return this._verticalAlign;
      }

      set verticalAlign(value) {
        this._verticalAlign = normalizeParam(value, VERTICAL_ALIGN);
        this.updateClassList();
      }

      /**
       * Pulls layout items to the layout boundaries and corresponds
       * to the padding size on the layout item. Possible values are small, medium, or large.
       * @type {string}
       * @default
       *
       */
      get pullToBoundary() {
        return this._pullToBoundary;
      }

      set pullToBoundary(value) {
        this._pullToBoundary = normalizeParam(value, BOUNDARY);
        this.updateClassList();
      }

      /**
       * If present, layout items wrap to the following line when they exceed the layout width.
       * @type {boolean}
       * @default false
       */
      get multipleRows() {
        return this._multipleRows || false;
      }

      set multipleRows(value) {
        this._multipleRows = normalizeBoolean(value);
        this.updateClassList();
      }

      connectedCallback() {
        this.updateClassList();
      }

      updateClassList() {
        this.classList.remove(...this._layoutClass);
        const config = computeLayoutClass(this.horizontalAlign, this.verticalAlign, this.pullToBoundary, this.multipleRows);
        this._layoutClass = Object.keys(config);
        this.classList.add(...this._layoutClass);
      }

    }

    lwc.registerDecorators(LightningLayout, {
      publicProps: {
        horizontalAlign: {
          config: 3
        },
        verticalAlign: {
          config: 3
        },
        pullToBoundary: {
          config: 3
        },
        multipleRows: {
          config: 3
        }
      },
      track: {
        _horizontalAlign: 1,
        _verticalAlign: 1,
        _pullToBoundary: 1,
        _multipleRows: 1
      },
      fields: ["_layoutClass"]
    });

    var _lightningLayout = lwc.registerComponent(LightningLayout, {
      tmpl: _tmpl
    });

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        key: 0
      }, [], $slotset)];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.slots = [""];
    tmpl$1.stylesheets = [];
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-layoutItem_layoutItem-host",
      shadowAttribute: "lightning-layoutItem_layoutItem"
    };

    const SIZE_MIN = 1;
    const SIZE_MAX = 12;
    const DEFAULT_LAYOUT_SIZE = {
      default: null,
      small: null,
      medium: null,
      large: null
    };
    const PADDING = ['horizontal-small', 'horizontal-medium', 'horizontal-large', 'around-small', 'around-medium', 'around-large'];
    const PADDING_CLASS = {
      'slds-p-right_small': 'horizontal-small',
      'slds-p-left_small': 'horizontal-small',
      'slds-p-right_medium': 'horizontal-medium',
      'slds-p-left_medium': 'horizontal-medium',
      'slds-p-right_large': 'horizontal-large',
      'slds-p-left_large': 'horizontal-large',
      'slds-p-around_small': 'around-small',
      'slds-p-around_medium': 'around-medium',
      'slds-p-around_large': 'around-large'
    };
    const FLEXIBILITY = ['auto', 'shrink', 'no-shrink', 'grow', 'no-grow', 'no-flex'];
    const FLEX_CLASS = {
      'slds-col': 'auto',
      'slds-grow': 'grow',
      'slds-shrink': 'shrink',
      'slds-grow-none': 'no-grow',
      'slds-shrink-none': 'no-shrink',
      'slds-no-flex': 'no-flex'
    };
    const SIZE_CLASS = {
      default: 'slds-size_',
      small: 'slds-small-size_',
      medium: 'slds-medium-size_',
      large: 'slds-large-size_'
    };
    const DIRECTION = ['left', 'top', 'right', 'bottom'];
    const STYLE_ERROR = {
      FLEX_CONFLICT: 'You cannot have `flexibility` value to be set to `auto` and `no-flex` together for <lightning-layout-item> component',
      SIZE_RANGE: 'Invalid `size` attribute for <lightning-layout-item> component. The `size` attribute should be an integer between 1 and 12',
      SMALL_SIZE_RANGE: 'Invalid `smallDeviceSize` attribute for <lightning-layout-item> component. The `smallDeviceSize` attribute should be an integer between 1 and 12',
      MEDIUM_SIZE_RANGE: 'Invalid `mediumDeviceSize` attribute for <lightning-layout-item> component. The `mediumDeviceSize` attribute should be an integer between 1 and 12',
      LARGE_SIZE_RANGE: 'Invalid `largeDeviceSize` attribute for <lightning-layout-item> component. The `largeDeviceSize` attribute should be an integer between 1 and 12',
      SIZE_REQUIRED: 'You cannot have device specific size attributes for <lightning-layout-item> component without specifying the `size` attribute'
    };

    function hasConflict(value) {
      return value.some(item => item === 'auto') && value.some(item => item === 'no-flex');
    }

    function toArray(value) {
      if (Array.isArray(value)) {
        return value;
      } else if (typeof value === 'string') {
        value = value.split(',');
        return value.map(item => item.trim());
      }

      return [value];
    }

    function normalizeDirection(value, fallback) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: fallback || '',
        validValues: DIRECTION
      });
    }
    function normalizePadding(value) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: ' ',
        validValues: PADDING
      });
    }
    function normalizeFlexibility(value) {
      value = toArray(value);

      if (hasConflict(value)) {
        throw new Error(STYLE_ERROR.FLEX_CONFLICT);
      }

      return value.filter(item => FLEXIBILITY.some(allowed => item === allowed));
    }
    function normalizeSize(value) {
      if (value != null) {
        const size = parseFloat(value);
        return isNaN(size) ? null : Math.round(size);
      }

      return value;
    }

    function computePaddingClass(padding, computedClass) {
      computedClass = computedClass || classSet();
      padding = padding || ' ';
      Object.keys(PADDING_CLASS).forEach(key => {
        if (PADDING_CLASS[key].toLowerCase() === padding) {
          computedClass.add(key);
        }
      });
      return computedClass;
    }

    function computeFlexibilityClass(flexibility, computedClass) {
      computedClass = computedClass || classSet();
      flexibility = flexibility || [];
      Object.keys(FLEX_CLASS).forEach(key => {
        if (flexibility.some(flex => flex === FLEX_CLASS[key])) {
          computedClass.add(key);
        }
      });
      return computedClass;
    }

    function computeSizeClass(layoutSize, computedClass) {
      computedClass = computedClass || classSet();
      layoutSize = layoutSize || DEFAULT_LAYOUT_SIZE;
      Object.keys(SIZE_CLASS).forEach(key => {
        const size = layoutSize[key];

        if (size != null && size !== 0) {
          computedClass.add(`${SIZE_CLASS[key]}${size}-of-12`);
        }
      });
      return computedClass;
    }

    function computeBumpClass(direction, computedClass) {
      computedClass = computedClass || classSet();
      direction = direction || '';

      if (direction !== '') {
        computedClass.add(`slds-col_bump-${direction}`);
      }

      return computedClass;
    }

    function computeLayoutClass$1(layoutSize, flexibility, padding, bump) {
      const computedClass = computePaddingClass(padding);
      computeFlexibilityClass(flexibility, computedClass);
      computeSizeClass(layoutSize, computedClass);
      computeBumpClass(bump, computedClass);
      return computedClass;
    }
    function validateSize(size, smallDeviceSize, mediumDeviceSize, largeDeviceSize) {
      if (size != null && !(SIZE_MIN <= size && size <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.SIZE_RANGE);
      }

      if (smallDeviceSize != null && !(SIZE_MIN <= smallDeviceSize && smallDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.SMALL_SIZE_RANGE);
      }

      if (mediumDeviceSize != null && !(SIZE_MIN <= mediumDeviceSize && mediumDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.MEDIUM_SIZE_RANGE);
      }

      if (largeDeviceSize && !(SIZE_MIN <= largeDeviceSize && largeDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.LARGE_SIZE_RANGE);
      }

      if (size == null && (smallDeviceSize != null || mediumDeviceSize != null || largeDeviceSize != null)) {
        throw new Error(STYLE_ERROR.SIZE_REQUIRED);
      }

      return true;
    }

    /**
     * The basic element in a lightning-layout component.
     * A layout item groups information together to define visual grids, spacing, and sections.
     * @slot default Placeholder for your content in lightning-layout-item.
     */

    class LightningLayoutItem extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._flexibility = void 0;
        this._alignmentBump = void 0;
        this._padding = void 0;
        this._size = void 0;
        this._smallDeviceSize = void 0;
        this._mediumDeviceSize = void 0;
        this._largeDeviceSize = void 0;
        this._layoutClass = [];
      }

      /**
       * Make the item fluid so that it absorbs any extra space in its
       * container or shrinks when there is less space. Allowed values are:
       * auto (columns grow or shrink equally as space allows),
       * shrink (columns shrink equally as space decreases),
       * no-shrink (columns don't shrink as space reduces),
       * grow (columns grow equally as space increases),
       * no-grow (columns don't grow as space increases),
       * no-flex (columns don't grow or shrink as space changes).
       * Use a comma-separated value for multiple options, such as 'auto, no-shrink'.
       * @type {object}
       */
      get flexibility() {
        return this._flexibility;
      }

      set flexibility(value) {
        this._flexibility = normalizeFlexibility(value);
        this.updateClassList();
      }

      /**
       * Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom.
       * @type {string}
       */
      get alignmentBump() {
        return this._alignmentBump;
      }

      set alignmentBump(value) {
        this._alignmentBump = normalizeDirection(value);
        this.updateClassList();
      }

      /**
       * Sets padding to either the right and left sides of a container,
       * or all sides of a container. Allowed values are horizontal-small,
       * horizontal-medium, horizontal-large, around-small, around-medium, around-large.
       * @type {string}
       */
      get padding() {
        return this._padding;
      }

      set padding(value) {
        this._padding = normalizePadding(value);
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, size indicates the
       * relative space the container occupies. Size is expressed as
       * an integer from 1 through 12. This applies for all device-types.
       * @type {number}
       */
      get size() {
        return this._size;
      }

      set size(value) {
        this._size = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * mobile. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get smallDeviceSize() {
        return this._smallDeviceSize;
      }

      set smallDeviceSize(value) {
        this._smallDeviceSize = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * tablet. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get mediumDeviceSize() {
        return this._mediumDeviceSize;
      }

      set mediumDeviceSize(value) {
        this._mediumDeviceSize = normalizeSize(value);
        this.validateSize();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * desktop. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get largeDeviceSize() {
        return this._largeDeviceSize;
      }

      set largeDeviceSize(value) {
        this._largeDeviceSize = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      connectedCallback() {
        this.updateClassList();
      }

      updateClassList() {
        this.classList.remove(...this._layoutClass);
        const config = computeLayoutClass$1({
          default: this.size,
          small: this.smallDeviceSize,
          medium: this.mediumDeviceSize,
          large: this.largeDeviceSize
        }, this.flexibility, this.padding, this.alignmentBump);
        this._layoutClass = Object.keys(config);
        this.classList.add(...this._layoutClass);
      }

      validateSize() {
        validateSize(this.size, this.smallDeviceSize, this.mediumDeviceSize, this.largeDeviceSize);
      }

    }

    lwc.registerDecorators(LightningLayoutItem, {
      publicProps: {
        flexibility: {
          config: 3
        },
        alignmentBump: {
          config: 3
        },
        padding: {
          config: 3
        },
        size: {
          config: 3
        },
        smallDeviceSize: {
          config: 3
        },
        mediumDeviceSize: {
          config: 3
        },
        largeDeviceSize: {
          config: 3
        }
      },
      track: {
        _flexibility: 1,
        _alignmentBump: 1,
        _padding: 1,
        _size: 1,
        _smallDeviceSize: 1,
        _mediumDeviceSize: 1,
        _largeDeviceSize: 1
      },
      fields: ["_layoutClass"]
    });

    var _lightningLayoutItem = lwc.registerComponent(LightningLayoutItem, {
      tmpl: _tmpl$1
    });

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        c: api_custom_element
      } = $api;
      return [api_element("p", {
        key: 0
      }, [api_text("The layout items extend vertically to fill the container.")]), api_element("div", {
        classMap: {
          "c-container": true
        },
        key: 6
      }, [api_custom_element("lightning-layout", _lightningLayout, {
        classMap: {
          "x-large": true
        },
        props: {
          "verticalAlign": "stretch",
          "multipleRows": "true"
        },
        key: 5
      }, [api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        classMap: {
          "custom-box": true
        },
        props: {
          "flexibility": "auto",
          "padding": "around-small"
        },
        key: 1
      }, [api_text("1")]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        classMap: {
          "custom-box": true
        },
        props: {
          "flexibility": "auto",
          "padding": "around-small"
        },
        key: 2
      }, [api_text("2")]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        classMap: {
          "custom-box": true
        },
        props: {
          "flexibility": "auto",
          "padding": "around-small"
        },
        key: 3
      }, [api_text("3")]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        classMap: {
          "custom-box": true
        },
        props: {
          "flexibility": "auto",
          "padding": "around-small"
        },
        key: 4
      }, [api_text("4")])])])];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets);
    }
    tmpl$2.stylesheetTokens = {
      hostAttribute: "c-verticalAlignStretch_verticalAlignStretch-host",
      shadowAttribute: "c-verticalAlignStretch_verticalAlignStretch"
    };

    class LightningExampleLayoutStretch extends lwc.LightningElement {}

    var main = lwc.registerComponent(LightningExampleLayoutStretch, {
      tmpl: _tmpl$2
    });

    registerWireService(lwc.register);

        const element = lwc.createElement('c-verticalAlignStretch', { is: main, fallback: true });
        document.querySelector('main').appendChild(element);

}(Engine));
