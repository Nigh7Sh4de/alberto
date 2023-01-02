using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Village : MonoBehaviour
{
  private const int VILLAGER_GROWTH_PT = 5;
  private TurnController turnController;
  private int previousTurn;
  public VillageInfo villageInfoPrefab;
  private VillageInfo villageInfo;
  public GameObject sideMenu;
  public VillageStats stats;
  private float timer;

  void Start()
  {
    turnController = GameObject.FindObjectOfType<TurnController>();

    stats = new VillageStats();
    villageInfo = Instantiate(villageInfoPrefab, sideMenu.transform);
    villageInfo.villageStats = stats;
  }

  void Update()
  {
    if (turnController.turn != previousTurn)
    {
      stats.villagers += VILLAGER_GROWTH_PT * (turnController.turn - previousTurn);
      previousTurn = turnController.turn;

    }
  }
}
