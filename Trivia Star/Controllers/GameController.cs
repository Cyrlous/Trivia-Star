using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Trivia_Star.Models;

namespace Trivia_Star.Controllers;

public class GameController : Controller
{
  private const string ScoreKey = "CurrentScore";
  private const string IndexKey = "CurrentQuestionIndex";
  private const string QuestionsKey = "Questions";
  private const string CategoryIdKey = "CategoryId";
  
  private readonly IConfiguration _config;
  private readonly IHttpClientFactory _httpClientFactory;

  public GameController(IConfiguration config, IHttpClientFactory httpClientFactory)
  {
    _config = config;
    _httpClientFactory = httpClientFactory;
  }
  public IActionResult Landing()
  {
    return View();
  }

  public IActionResult Options()
  {
    return View();
  }
  
  [HttpGet]
  public async Task<IActionResult> Start(int category, string difficulty)
  {
    var model = new APIModel
    {
      Category = category,
      Difficulty = difficulty,
      NumQuestions = 10,
      Type = "multiple"
    };

    var apiUrl = $"https://opentdb.com/api.php?amount={model.NumQuestions}&category={model.Category}&difficulty={model.Difficulty}&type={model.Type}";

    var client = _httpClientFactory.CreateClient();
    var response = await client.GetStringAsync(apiUrl);
    
    var triviaResponse = JsonConvert.DeserializeObject<TriviaResponseModel>(response);
    triviaResponse.CategoryId = category;
    
    if (triviaResponse == null || triviaResponse.Results == null || !triviaResponse.Results.Any())
    {
      return RedirectToAction("Options");
    }
    
    HttpContext.Session.SetString(QuestionsKey, JsonConvert.SerializeObject(triviaResponse.Results));
    HttpContext.Session.SetInt32(ScoreKey, 0);
    HttpContext.Session.SetInt32(IndexKey, 0);
    HttpContext.Session.SetInt32(CategoryIdKey, category);
    
    return RedirectToAction("Question");
  }

  public IActionResult Question()
  {
    var questionsJson = HttpContext.Session.GetString(QuestionsKey);
    var index = HttpContext.Session.GetInt32(IndexKey) ?? 0;

    if (string.IsNullOrEmpty(questionsJson))
    {
      return RedirectToAction("Options");
    }
    
    var questions = JsonConvert.DeserializeObject<List<QuestionModel>>(questionsJson);

    if (index >= questions.Count)
    {
      return RedirectToAction("Score");
    }
    
    var question = questions[index];
    question.QuestionIndex = index;
    
    return View(question);
  }

  public IActionResult SubmitAnswer(string selectedAnswer)
  {
    var questionsJson = HttpContext.Session.GetString(QuestionsKey);
    var index = HttpContext.Session.GetInt32(IndexKey) ?? 0;
    var score = HttpContext.Session.GetInt32(ScoreKey) ?? 0;
    
    if (string.IsNullOrEmpty(questionsJson))
    {
      return RedirectToAction("Landing");
    }
    
    var questions = JsonConvert.DeserializeObject<List<QuestionModel>>(questionsJson);

    if (index >= questions.Count)
    {
      return RedirectToAction("Score");
    }
    
    var correctAnswer = questions[index].CorrectAnswer;

    if (selectedAnswer == correctAnswer)
    {
      score++;
      HttpContext.Session.SetInt32(ScoreKey, score);
    }
    
    index++;
    HttpContext.Session.SetInt32(IndexKey, index);
    
    return RedirectToAction("Question");
  }

  public IActionResult Score()
  {
    var score = HttpContext.Session.GetInt32(ScoreKey) ?? 0;
    var total = 10;
    
    var model = new ScoreModel
    {
      TotalScore = score,
      TotalPossible = total
    };
    
    HttpContext.Session.Remove(QuestionsKey);
    HttpContext.Session.Remove(IndexKey);
    HttpContext.Session.Remove(ScoreKey);
    
    return View(model);
  }
}