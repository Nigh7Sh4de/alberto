using UnityEngine;
using TMPro;

public class TurnCounter : TextMeshProUGUI
{
  private TurnController turnController;
  private int previousTurn;

  protected override void Start()
  {
    turnController = GameObject.FindObjectOfType<TurnController>();
  }

  // Update is called once per frame
  void Update()
  {
    if (turnController.turn != previousTurn)
    {
      Debug.Log("TurnCounter: " + turnController.turn + " " + (turnController.turn != previousTurn));
      this.text = "Turn: " + turnController.turn;
      previousTurn = turnController.turn;

    }
  }
}
