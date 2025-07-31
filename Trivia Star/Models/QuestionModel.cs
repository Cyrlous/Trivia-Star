using Newtonsoft.Json;
using System.Collections.Generic;
namespace Trivia_Star.Models;

public class QuestionModel
{ 
    [JsonProperty("category")]
    public string Category { get; set; }

    [JsonProperty("type")]
    public string Type { get; set; }

    [JsonProperty("difficulty")]
    public string Difficulty { get; set; }

    [JsonProperty("question")]
    public string Question { get; set; }

    [JsonProperty("correct_answer")]
    public string CorrectAnswer { get; set; }

    [JsonProperty("incorrect_answers")]
    public List<string> IncorrectAnswers { get; set; }
    
    [JsonIgnore]
    public int QuestionIndex { get; set; }
    
    [JsonIgnore]
    public string UserSelectedAnswer { get; set; }
    
    [JsonIgnore]
    public bool AnswerSubmitted => !string.IsNullOrEmpty(UserSelectedAnswer);
    
    public List<string> ShuffledAnswers { get; set; } = new List<string>();
 }