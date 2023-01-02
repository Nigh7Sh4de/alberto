using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TurnController : MonoBehaviour
{
  public int turn = 0;

  public void nextTurn()
  {
    turn++;
  }
}
