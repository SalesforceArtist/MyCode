<Query Kind="Statements">
  <NuGetReference>Newtonsoft.Json</NuGetReference>
  <Namespace>Newtonsoft.Json</Namespace>
  <Namespace>Newtonsoft.Json.Linq</Namespace>
</Query>

var json = "{ \"store\": { \"book\": [ { \"category\": \"reference\", \"author\": \"Nigel Rees\", \"title\": \"Sayings of the Century\", \"price\": 8.95 }, { \"category\": \"fiction\", \"author\": \"Evelyn Waugh\", \"title\": \"Sword of Honour\", \"price\": 12.99 }, { \"category\": \"fiction\", \"author\": \"Herman Melville\", \"title\": \"Moby Dick\", \"isbn\": \"0-553-21311-3\", \"price\": 8.99 }, { \"category\": \"fiction\", \"author\": \"J. R. R. Tolkien\", \"title\": \"The Lord of the Rings\", \"isbn\": \"0-395-19395-8\", \"price\": 22.99 } ], \"bicycle\": { \"color\": \"red\", \"price\": 19.95 }  } }";

JObject o = JObject.Parse(json);

var titles = from b in o["store"]["book"] 
			 select (string)b["title"];
			
var s = o["store"]["book"].Select(x => x["price"]).Values<double>().Sum();


Console.WriteLine(titles);
Console.WriteLine(s);

// And JSONPATH
var authors = o.SelectToken("$.store.book").Values<string>("author");
Console.WriteLine(authors);

var book = o.SelectToken("$.store.book[?(@.title == 'Moby Dick')]");
Console.WriteLine(book);