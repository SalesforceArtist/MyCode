using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static string json = @"{ ""store"": {
    ""book"": [ 
{ ""category"": ""reference"",
        ""author"": ""Nigel Rees"",
        ""title"": ""Sayings of the Century"",
        ""price"": 8.95
      },
{ ""category"": ""fiction"",
        ""author"": ""Evelyn Waugh"",
        ""title"": ""Sword of Honour"",
        ""price"": 12.99
      },
{ ""category"": ""fiction"",
        ""author"": ""Herman Melville"",
        ""title"": ""Moby Dick"",
        ""isbn"": ""0-553-21311-3"",
        ""price"": 8.99
      },
{ ""category"": ""fiction"",
        ""author"": ""J. R. R. Tolkien"",
        ""title"": ""The Lord of the Rings"",
        ""isbn"": ""0-395-19395-8"",
        ""price"": 22.99
      }
    ],
    ""bicycle"": {
      ""color"": ""red"",
      ""price"": 19.95
    }
  }
}";



        static void Main(string[] args)
        {
            var obj = JObject.Parse(json);
            /*
            var titles = obj.SelectTokens("$.store.book[*].title");

            Console.WriteLine(titles.First());
            
            var book = obj.SelectToken("$.store.book[?(@.title == 'Moby Dick')]");

            Console.WriteLine(book);
            */

            var titles = from book in obj["store"]["book"] 
                select (string)book["title"];

            Console.WriteLine(titles);

            var sum = obj["store"]["book"]
                .Select(x => x["price"])
                .Values<double>().Sum();

            Console.WriteLine(sum);

        }
    }
}
