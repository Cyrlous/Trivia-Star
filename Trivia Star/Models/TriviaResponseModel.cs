using Newtonsoft.Json;
using System.Collections.Generic;
namespace Trivia_Star.Models;

public class TriviaResponseModel
{
    [JsonProperty("response_code")]
    public int ResponseCode { get; set; }

    [JsonProperty("results")]
    public List<QuestionModel> Results { get; set; }
    
    public int CategoryId { get; set; }
}