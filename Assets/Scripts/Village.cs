using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class Village : MonoBehaviour
{
    private const int VILLAGER_GROWTH_PT = 10;
    private const int IDOLPOOL_VILLAGER_GROWTH_PT = 5;
    private const int IDOLPOOL_VILLAGER_TARGET = 50;

    private TurnController turnController;
    private int previousTurn;
    public VillageInfo villageInfoPrefab;
    private VillageInfo villageInfo;
    public GameObject sideMenu;
    private VillageStats idolPool;
    private float timer;

    void Start()
    {
        turnController = GameObject.FindObjectOfType<TurnController>();

        villageInfo = Instantiate(villageInfoPrefab, sideMenu.transform);
        villageInfo.villageStats = new VillageInfoProps();
    }

    void Update()
    {
        if (turnController.turn != previousTurn)
        {
            updateStats(turnController.turn - previousTurn);

            previousTurn = turnController.turn;
        }
    }

    void updateStats(int dt)
    {
        Debug.Log("DP updateStats");
        int newVillagers = VILLAGER_GROWTH_PT * dt;
        Debug.Log(newVillagers);
        if (villageInfo.idolToggle.isOn)
        {
            villageInfo.villageStats.idolPool.villagers += (newVillagers -= IDOLPOOL_VILLAGER_GROWTH_PT * dt);
            Debug.Log(newVillagers);
            if (villageInfo.villageStats.idolPool.villagers >= IDOLPOOL_VILLAGER_TARGET)
            {
                villageInfo.villageStats.idolPool.villagers -= IDOLPOOL_VILLAGER_TARGET;
                villageInfo.villageStats.mainPool.idols += 1;
            }
        }
        villageInfo.villageStats.mainPool.villagers += newVillagers;
        Debug.Log(newVillagers);
    }
}
