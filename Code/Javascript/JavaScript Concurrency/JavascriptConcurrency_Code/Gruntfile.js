module.exports = function(grunt) {

	'use strict';

	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-preprocess');

	grunt.initConfig({
		babel: {
			web: {
				options: {},
				files: {
					'chapter2/using-settimeout-1/es5/main.js':
						'chapter2/using-settimeout-1/main.js',
					'chapter2/using-settimeout-2/es5/main.js':
						'chapter2/using-settimeout-2/main.js',
					'chapter2/using-setinterval/es5/main.js':
						'chapter2/using-setinterval/main.js',
					'chapter2/event-targets/es5/main.js':
						'chapter2/event-targets/main.js',
					'chapter2/managing-event-frequency/es5/main.js':
						'chapter2/managing-event-frequency/main.js',
					'chapter2/making-requests/es5/main.js':
						'chapter2/making-requests/main.js',
					'chapter2/coordinating-requests/es5/main.js':
						'chapter2/coordinating-requests/main.js',

					'chapter3/resolving-promises-1/es5/main.js':
						'chapter3/resolving-promises-1/main.js',
					'chapter3/resolving-promises-2/es5/main.js':
						'chapter3/resolving-promises-2/main.js',
					'chapter3/rejecting-promises-1/es5/main.js':
						'chapter3/rejecting-promises-1/main.js',
					'chapter3/rejecting-promises-2/es5/main.js':
						'chapter3/rejecting-promises-2/main.js',
					'chapter3/empty-promises-1/es5/main.js':
						'chapter3/empty-promises-1/main.js',
					'chapter3/empty-promises-2/es5/main.js':
						'chapter3/empty-promises-2/main.js',
					'chapter3/resolution-job-queues/es5/main.js':
						'chapter3/resolution-job-queues/main.js',
					'chapter3/using-promised-data/es5/main.js':
						'chapter3/using-promised-data/main.js',
					'chapter3/error-callbacks/es5/main.js':
						'chapter3/error-callbacks/main.js',
					'chapter3/always-reacting/es5/main.js':
						'chapter3/always-reacting/main.js',
					'chapter3/resolving-other-promises/es5/main.js':
						'chapter3/resolving-other-promises/main.js',
					'chapter3/promise-like-objects/es5/main.js':
						'chapter3/promise-like-objects/main.js',
					'chapter3/promises-only-change-state-once-1/es5/main.js':
						'chapter3/promises-only-change-state-once-1/main.js',
					'chapter3/promises-only-change-state-once-2/es5/main.js':
						'chapter3/promises-only-change-state-once-2/main.js',
					'chapter3/immutable-promises/es5/main.js':
						'chapter3/immutable-promises/main.js',
					'chapter3/many-callbacks-many-promises/es5/main.js':
						'chapter3/many-callbacks-many-promises/main.js',
					'chapter3/passing-promises-around/es5/main.js':
						'chapter3/passing-promises-around/main.js',
					'chapter3/waiting-on-promises/es5/main.js':
						'chapter3/waiting-on-promises/main.js',
					'chapter3/cancelling-promises/es5/main.js':
						'chapter3/cancelling-promises/main.js',
					'chapter3/promises-without-executors/es5/main.js':
						'chapter3/promises-without-executors/main.js',

					'chapter4/generator-function-syntax/es5/main.js':
						'chapter4/generator-function-syntax/main.js',
					'chapter4/yielding-values/es5/main.js':
						'chapter4/yielding-values/main.js',
					'chapter4/iterating-over-generators/es5/main.js':
						'chapter4/iterating-over-generators/main.js',
					'chapter4/no-end-in-sight/es5/main.js':
						'chapter4/no-end-in-sight/main.js',
					'chapter4/alternating-sequences/es5/main.js':
						'chapter4/alternating-sequences/main.js',
					'chapter4/selecting-a-strategy/es5/main.js':
						'chapter4/selecting-a-strategy/main.js',
					'chapter4/interweaving-generators/es5/main.js':
						'chapter4/interweaving-generators/main.js',
					'chapter4/reusing-generators/es5/main.js':
						'chapter4/reusing-generators/main.js',
					'chapter4/lightweight-map-reduce/es5/main.js':
						'chapter4/lightweight-map-reduce/main.js',
					'chapter4/creating-coroutine-functions/es5/main.js':
						'chapter4/creating-coroutine-functions/main.js',
					'chapter4/handling-dom-events/es5/main.js':
						'chapter4/handling-dom-events/main.js',
					'chapter4/handling-promised-values/es5/main.js':
						'chapter4/handling-promised-values/main.js',

					'chapter5/loading-scripts/es5/main.js':
						'chapter5/loading-scripts/main.js',
					'chapter5/loading-scripts/es5/worker.js':
						'chapter5/loading-scripts/worker.js',
					'chapter5/posting-messages/es5/main.js':
						'chapter5/posting-messages/main.js',
					'chapter5/posting-messages/es5/worker.js':
						'chapter5/posting-messages/worker.js',
					'chapter5/message-serialization/es5/main.js':
						'chapter5/message-serialization/main.js',
					'chapter5/message-serialization/es5/worker.js':
						'chapter5/message-serialization/worker.js',
					'chapter5/receiving-messages-from-workers/es5/main.js':
						'chapter5/receiving-messages-from-workers/main.js',
					'chapter5/receiving-messages-from-workers/es5/worker.js':
						'chapter5/receiving-messages-from-workers/worker.js',
					'chapter5/sharing-memory/es5/main.js':
						'chapter5/sharing-memory/main.js',
					'chapter5/sharing-memory/es5/worker.js':
						'chapter5/sharing-memory/worker.js',
					'chapter5/fetching-resources/es5/main.js':
						'chapter5/fetching-resources/main.js',
					'chapter5/fetching-resources/es5/worker.js':
						'chapter5/fetching-resources/worker.js',
					'chapter5/communicating-between-pages/es5/main.js':
						'chapter5/communicating-between-pages/main.js',
					'chapter5/communicating-between-pages/es5/worker.js':
						'chapter5/communicating-between-pages/worker.js',
					'chapter5/dividing-work-into-tasks/es5/main.js':
						'chapter5/dividing-work-into-tasks/main.js',
					'chapter5/dividing-work-into-tasks/es5/worker.js':
						'chapter5/dividing-work-into-tasks/worker.js',
					'chapter5/dividing-work-into-tasks/es5/sub-worker.js':
						'chapter5/dividing-work-into-tasks/sub-worker.js',
					'chapter5/error-condition-checking/es5/main.js':
						'chapter5/error-condition-checking/main.js',
					'chapter5/error-condition-checking/es5/worker.js':
						'chapter5/error-condition-checking/worker.js',
					'chapter5/exception-handling/es5/main.js':
						'chapter5/exception-handling/main.js',
					'chapter5/exception-handling/es5/worker.js':
						'chapter5/exception-handling/worker.js',

					'chapter6/referential-transparency/es5/main.js':
						'chapter6/referential-transparency/main.js',
					'chapter6/how-big-is-the-data/es5/main.js':
						'chapter6/how-big-is-the-data/main.js',
					'chapter6/hardware-concurrency-capabilities/es5/main.js':
						'chapter6/hardware-concurrency-capabilities/main.js',
					'chapter6/creating-tasks-and-assigning-work/es5/main.js':
						'chapter6/creating-tasks-and-assigning-work/main.js',
					'chapter6/creating-tasks-and-assigning-work/es5/worker.js':
						'chapter6/creating-tasks-and-assigning-work/worker.js',
					'chapter6/creating-tasks-and-assigning-work/es5/task.js':
						'chapter6/creating-tasks-and-assigning-work/task.js',
					'chapter6/searching-collections/es5/main.js':
						'chapter6/searching-collections/main.js',
					'chapter6/searching-collections/es5/worker.js':
						'chapter6/searching-collections/worker.js',
					'chapter6/searching-collections/es5/task.js':
						'chapter6/searching-collections/task.js',
					'chapter6/mapping/es5/main.js':
						'chapter6/mapping/main.js',
					'chapter6/mapping/es5/worker.js':
						'chapter6/mapping/worker.js',
					'chapter6/mapping/es5/task.js':
						'chapter6/mapping/task.js',
					'chapter6/translating-dom-manipulation/es5/main.js':
						'chapter6/translating-dom-manipulation/main.js',
					'chapter6/translating-dom-manipulation/es5/worker.js':
						'chapter6/translating-dom-manipulation/worker.js',
					'chapter6/translating-dom-events/es5/main.js':
						'chapter6/translating-dom-events/main.js',
					'chapter6/translating-dom-events/es5/worker.js':
						'chapter6/translating-dom-events/worker.js',

					'chapter7/without-concurrency/es5/main.js':
						'chapter7/without-concurrency/main.js',
					'chapter7/helper-functions/es5/main.js':
						'chapter7/helper-functions/main.js',
					'chapter7/helper-functions/es5/worker.js':
						'chapter7/helper-functions/worker.js',
					'chapter7/extending-postmessage/es5/main.js':
						'chapter7/extending-postmessage/main.js',
					'chapter7/extending-postmessage/es5/worker.js':
						'chapter7/extending-postmessage/worker.js',
					'chapter7/synchronizing-worker-results/es5/main.js':
						'chapter7/synchronizing-worker-results/main.js',
					'chapter7/synchronizing-worker-results/es5/worker.js':
						'chapter7/synchronizing-worker-results/worker.js',
					'chapter7/generating-values-in-workers/es5/main.js':
						'chapter7/generating-values-in-workers/main.js',
					'chapter7/generating-values-in-workers/es5/worker.js':
						'chapter7/generating-values-in-workers/worker.js',
					'chapter7/lazy-worker-chains/es5/main.js':
						'chapter7/lazy-worker-chains/main.js',
					'chapter7/lazy-worker-chains/es5/worker.js':
						'chapter7/lazy-worker-chains/worker.js',
					'chapter7/spawning-workers/es5/main.js':
						'chapter7/spawning-workers/main.js',
					'chapter7/mapping-and-reducing/es5/main.js':
						'chapter7/mapping-and-reducing/main.js',
					'chapter7/worker-pools/es5/main.js':
						'chapter7/worker-pools/main.js',
					'chapter7/worker-pools/es5/worker.js':
						'chapter7/worker-pools/worker.js'
				}
			},
			node: {
				options: {
					optional: 'runtime'
				},

				files: {
					'chapter9/awaiting-values/es5/main.js':
						'chapter9/awaiting-values/main.js'
				}
			}
		},

		clean: {
			runtime: [
				'browser-polyfill.min.js'
			],

			parallel: [
				'paralleljs'
			],

			es5: [
				'chapter2/using-settimeout-1/es5',
				'chapter2/using-settimeout-2/es5',
				'chapter2/using-setinterval/es5',
				'chapter2/event-targets/es5',
				'chapter2/managing-event-frequency/es5',
				'chapter2/making-requests/es5',
				'chapter2/coordinating-requests/es5',

				'chapter3/resolving-promises-1/es5',
				'chapter3/resolving-promises-2/es5',
				'chapter3/rejecting-promises-1/es5',
				'chapter3/rejecting-promises-2/es5',
				'chapter3/empty-promises-1/es5',
				'chapter3/empty-promises-2/es5',
				'chapter3/resolution-job-queues/es5',
				'chapter3/using-promised-data/es5',
				'chapter3/error-callbacks/es5',
				'chapter3/always-reacting/es5',
				'chapter3/resolving-other-promises/es5',
				'chapter3/promise-like-objects/es5',
				'chapter3/promises-only-change-state-once-1/es5',
				'chapter3/promises-only-change-state-once-2/es5',
				'chapter3/immutable-promises/es5',
				'chapter3/many-callbacks-many-promises/es5',
				'chapter3/passing-promises-around/es5',
				'chapter3/waiting-on-promises/es5',
				'chapter3/cancelling-promises/es5',
				'chapter3/promises-without-executors/es5',

				'chapter4/generator-function-syntax/es5',
				'chapter4/yielding-values/es5',
				'chapter4/iterating-over-generators/es5',
				'chapter4/no-end-in-sight/es5',
				'chapter4/alternating-sequences/es5',
				'chapter4/selecting-a-strategy/es5',
				'chapter4/interweaving-generators/es5',
				'chapter4/reusing-generators/es5',
				'chapter4/lightweight-map-reduce/es5',
				'chapter4/creating-coroutine-functions/es5',
				'chapter4/handling-dom-events/es5',
				'chapter4/handling-promised-values/es5',

				'chapter5/loading-scripts/es5',
				'chapter5/loading-scripts/lodash.min.js',
				'chapter5/posting-messages/es5',
				'chapter5/message-serialization/es5',
				'chapter5/receiving-messages-from-workers/es5',
				'chapter5/sharing-memory/es5',
				'chapter5/fetching-resources/es5',
				'chapter5/communicating-between-pages/es5',
				'chapter5/dividing-work-into-tasks/es5',
				'chapter5/error-condition-checking/es5',
				'chapter5/exception-handling/es5',

				'chapter6/referential-transparency/es5',
				'chapter6/how-big-is-the-data/es5',
				'chapter6/hardware-concurrency-capabilities/es5',
				'chapter6/creating-tasks-and-assigning-work/es5',
				'chapter6/searching-collections/es5',
				'chapter6/mapping/es5',
				'chapter6/translating-dom-manipulation/es5',
				'chapter6/translating-dom-events/es5',

				'chapter7/without-concurrency/es5',
				'chapter7/helper-functions/es5',
				'chapter7/extending-postmessage/es5',
				'chapter7/synchronizing-worker-results/es5',
				'chapter7/generating-values-in-workers/es5',
				'chapter7/lazy-worker-chains/es5',
				'chapter7/spawning-workers/es5',
				'chapter7/spawning-workers/paralleljs',
				'chapter7/mapping-and-reducing/es5',
				'chapter7/mapping-and-reducing/paralleljs',
				'chapter7/worker-pools/es5',

				'chapter9/awaiting-values/es5'
			]
		},

		copy: {
			runtime: {
				files: [
					{
						src: [ 'node_modules/grunt-babel/node_modules/babel-core/browser-polyfill.min.js' ],
						dest: 'browser-polyfill.min.js'
					}
				]
			},

			index: {
				files: [
					{
						src: [ 'chapter2/using-settimeout-1/index.html' ],
						dest: 'chapter2/using-settimeout-1/es5/index.html'
					}, {
						src: [ 'chapter2/using-settimeout-2/index.html' ],
						dest: 'chapter2/using-settimeout-2/es5/index.html'
					}, {
						src: [ 'chapter2/using-setinterval/index.html' ],
						dest: 'chapter2/using-setinterval/es5/index.html'
					}, {
						src: [ 'chapter2/event-targets/index.html' ],
						dest: 'chapter2/event-targets/es5/index.html'
					}, {
						src: [ 'chapter2/managing-event-frequency/index.html' ],
						dest: 'chapter2/managing-event-frequency/es5/index.html'
					}, {
						src: [ 'chapter2/making-requests/index.html' ],
						dest: 'chapter2/making-requests/es5/index.html'
					}, {
						src: [ 'chapter2/coordinating-requests/index.html' ],
						dest: 'chapter2/coordinating-requests/es5/index.html'
					},

					{
						src: [ 'chapter3/resolving-promises-1/index.html' ],
						dest: 'chapter3/resolving-promises-1/es5/index.html'
					}, {
						src: [ 'chapter3/resolving-promises-2/index.html' ],
						dest: 'chapter3/resolving-promises-2/es5/index.html'
					}, {
						src: [ 'chapter3/rejecting-promises-1/index.html' ],
						dest: 'chapter3/rejecting-promises-1/es5/index.html'
					}, {
						src: [ 'chapter3/rejecting-promises-2/index.html' ],
						dest: 'chapter3/rejecting-promises-2/es5/index.html'
					}, {
						src: [ 'chapter3/empty-promises-1/index.html' ],
						dest: 'chapter3/empty-promises-1/es5/index.html'
					}, {
						src: [ 'chapter3/empty-promises-2/index.html' ],
						dest: 'chapter3/empty-promises-2/es5/index.html'
					}, {
						src: [ 'chapter3/resolution-job-queues/index.html' ],
						dest: 'chapter3/resolution-job-queues/es5/index.html'
					}, {
						src: [ 'chapter3/using-promised-data/index.html' ],
						dest: 'chapter3/using-promised-data/es5/index.html'
					}, {
						src: [ 'chapter3/error-callbacks/index.html' ],
						dest: 'chapter3/error-callbacks/es5/index.html'
					}, {
						src: [ 'chapter3/always-reacting/index.html' ],
						dest: 'chapter3/always-reacting/es5/index.html'
					}, {
						src: [ 'chapter3/resolving-other-promises/index.html' ],
						dest: 'chapter3/resolving-other-promises/es5/index.html'
					}, {
						src: [ 'chapter3/promise-like-objects/index.html' ],
						dest: 'chapter3/promise-like-objects/es5/index.html'
					}, {
						src: [ 'chapter3/promises-only-change-state-once-1/index.html' ],
						dest: 'chapter3/promises-only-change-state-once-1/es5/index.html'
					}, {
						src: [ 'chapter3/promises-only-change-state-once-2/index.html' ],
						dest: 'chapter3/promises-only-change-state-once-2/es5/index.html'
					}, {
						src: [ 'chapter3/immutable-promises/index.html' ],
						dest: 'chapter3/immutable-promises/es5/index.html'
					},
					{
						src: [ 'chapter3/many-callbacks-many-promises/index.html' ],
						dest: 'chapter3/many-callbacks-many-promises/es5/index.html'
					}, {
						src: [ 'chapter3/passing-promises-around/index.html' ],
						dest: 'chapter3/passing-promises-around/es5/index.html'
					}, {
						src: [ 'chapter3/waiting-on-promises/index.html' ],
						dest: 'chapter3/waiting-on-promises/es5/index.html'
					}, {
						src: [ 'chapter3/cancelling-promises/index.html' ],
						dest: 'chapter3/cancelling-promises/es5/index.html'
					}, {
						src: [ 'chapter3/promises-without-executors/index.html' ],
						dest: 'chapter3/promises-without-executors/es5/index.html'
					}
				]
			},
			api: {
				files: [
					{
						src: [ 'chapter2/making-requests/api.json' ],
						dest: 'chapter2/making-requests/es5/api.json'
					}, {
						src: [ 'chapter2/coordinating-requests/api.json' ],
						dest: 'chapter2/coordinating-requests/es5/api.json'
					},

					{
						src: [ 'chapter3/using-promised-data/api.json' ],
						dest: 'chapter3/using-promised-data/es5/api.json'
					}, {
						src: [ 'chapter3/waiting-on-promises/api.json' ],
						dest: 'chapter3/waiting-on-promises/es5/api.json'
					},

					{
						src: [ 'chapter5/fetching-resources/api.json' ],
						dest: 'chapter5/fetching-resources/es5/api.json'
					}
				]
			},
			lib: {
				files: [
					{
						src: [ 'lib/lodash.min.js' ],
						dest: 'chapter5/loading-scripts/lodash.min.js'
					}, {
						src: [ 'lib/lodash.min.js' ],
						dest: 'chapter5/loading-scripts/es5/lodash.min.js'
					},

					{
						expand: true,
						src: [ '**/*' ],
						cwd: 'node_modules/paralleljs/lib',
						dest: 'chapter7/spawning-workers/paralleljs'
					},
					{
						expand: true,
						src: [ '**/*' ],
						cwd: 'node_modules/paralleljs/lib',
						dest: 'chapter7/spawning-workers/es5/paralleljs'
					},
					{
						expand: true,
						src: [ '**/*' ],
						cwd: 'node_modules/paralleljs/lib',
						dest: 'chapter7/mapping-and-reducing/paralleljs'
					},
					{
						expand: true,
						src: [ '**/*' ],
						cwd: 'node_modules/paralleljs/lib',
						dest: 'chapter7/mapping-and-reducing/es5/paralleljs'
					}
				]
			}
		},

		preprocess: {
			options: {
				context: {
					POLYFILL: '<script src="../../../browser-polyfill.min.js"></script>'
				}
			},
			html: {
				files: {
					'chapter4/generator-function-syntax/es5/index.html':
						'chapter4/generator-function-syntax/index.html',
					'chapter4/yielding-values/es5/index.html':
						'chapter4/yielding-values/index.html',
					'chapter4/iterating-over-generators/es5/index.html':
						'chapter4/iterating-over-generators/index.html',
					'chapter4/no-end-in-sight/es5/index.html':
						'chapter4/no-end-in-sight/index.html',
					'chapter4/alternating-sequences/es5/index.html':
						'chapter4/alternating-sequences/index.html',
					'chapter4/selecting-a-strategy/es5/index.html':
						'chapter4/selecting-a-strategy/index.html',
					'chapter4/interweaving-generators/es5/index.html':
						'chapter4/interweaving-generators/index.html',
					'chapter4/reusing-generators/es5/index.html':
						'chapter4/reusing-generators/index.html',
					'chapter4/lightweight-map-reduce/es5/index.html':
						'chapter4/lightweight-map-reduce/index.html',
					'chapter4/creating-coroutine-functions/es5/index.html':
						'chapter4/creating-coroutine-functions/index.html',
					'chapter4/handling-dom-events/es5/index.html':
						'chapter4/handling-dom-events/index.html',
					'chapter4/handling-promised-values/es5/index.html':
						'chapter4/handling-promised-values/index.html',

					'chapter5/loading-scripts/es5/index.html':
						'chapter5/loading-scripts/index.html',
					'chapter5/posting-messages/es5/index.html':
						'chapter5/posting-messages/index.html',
					'chapter5/message-serialization/es5/index.html':
						'chapter5/message-serialization/index.html',
					'chapter5/receiving-messages-from-workers/es5/index.html':
						'chapter5/receiving-messages-from-workers/index.html',
					'chapter5/sharing-memory/es5/index.html':
						'chapter5/sharing-memory/index.html',
					'chapter5/fetching-resources/es5/index.html':
						'chapter5/fetching-resources/index.html',
					'chapter5/communicating-between-pages/es5/index.html':
						'chapter5/communicating-between-pages/index.html',
					'chapter5/dividing-work-into-tasks/es5/index.html':
						'chapter5/dividing-work-into-tasks/index.html',
					'chapter5/error-condition-checking/es5/index.html':
						'chapter5/error-condition-checking/index.html',
					'chapter5/exception-handling/es5/index.html':
						'chapter5/exception-handling/index.html',

					'chapter6/referential-transparency/es5/index.html':
						'chapter6/referential-transparency/index.html',
					'chapter6/how-big-is-the-data/es5/index.html':
						'chapter6/how-big-is-the-data/index.html',
					'chapter6/hardware-concurrency-capabilities/es5/index.html':
						'chapter6/hardware-concurrency-capabilities/index.html',
					'chapter6/creating-tasks-and-assigning-work/es5/index.html':
						'chapter6/creating-tasks-and-assigning-work/index.html',
					'chapter6/searching-collections/es5/index.html':
						'chapter6/searching-collections/index.html',
					'chapter6/mapping/es5/index.html':
						'chapter6/mapping/index.html',
					'chapter6/translating-dom-manipulation/es5/index.html':
						'chapter6/translating-dom-manipulation/index.html',
					'chapter6/translating-dom-events/es5/index.html':
						'chapter6/translating-dom-events/index.html',

					'chapter7/without-concurrency/es5/index.html':
						'chapter7/without-concurrency/index.html',
					'chapter7/helper-functions/es5/index.html':
						'chapter7/helper-functions/index.html',
					'chapter7/extending-postmessage/es5/index.html':
						'chapter7/extending-postmessage/index.html',
					'chapter7/synchronizing-worker-results/es5/index.html':
						'chapter7/synchronizing-worker-results/index.html',
					'chapter7/generating-values-in-workers/es5/index.html':
						'chapter7/generating-values-in-workers/index.html',
					'chapter7/lazy-worker-chains/es5/index.html':
						'chapter7/lazy-worker-chains/index.html',
					'chapter7/spawning-workers/es5/index.html':
						'chapter7/spawning-workers/index.html',
					'chapter7/mapping-and-reducing/es5/index.html':
						'chapter7/mapping-and-reducing/index.html',
					'chapter7/worker-pools/es5/index.html':
						'chapter7/worker-pools/index.html'
				}
			}
		}
	});

	grunt.registerTask('default', [ 'clean', 'babel', 'copy', 'preprocess' ]);
};
