using System;
using Newtonsoft.Json;

namespace JSONExample
{
    public class Record
    {
        public string call;
        public double lat;
        public double lng;
    }

    class Program
    {
        static void Main(string[] args)
        {

            string json = "{ \"call\": \"kf6gpe-9\", \"lat\": 21.9749, \"lng\": 159.3686 }";

            var typesafeResult = JsonConvert.DeserializeObject<Record>(json, new JsonSerializerSettings
                {
                    MissingMemberHandling = MissingMemberHandling.Error
                });

            Console.Write(JsonConvert.SerializeObject(typesafeResult));

            return;

        }
    }
}
