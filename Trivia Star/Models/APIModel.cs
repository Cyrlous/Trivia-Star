namespace Trivia_Star.Models;

public class APIModel
{
    public int NumQuestions { get; set; } = 10;
    public int Category { get; set; }
    public string Difficulty { get; set; } = "";
    public string Type { get; set; } = "multiple";
}