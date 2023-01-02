using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

[System.Serializable]
public class VillageStats
{
  public int villagers;
  public int idols;
}

public class VillageInfo : MonoBehaviour
{
  public VillageStats villageStats;
  private VillageStats oldVillageStats;
  [SerializeField] private TextMeshProUGUI villagersText;
  [SerializeField] private TextMeshProUGUI idolsText;

  void Start()
  {

  }

  void Update()
  {
    if (villageStats != oldVillageStats)
    {
      villagersText.text = "Villagers: " + villageStats.villagers;
      idolsText.text = "Idols: " + villageStats.idols;
    }
  }
}
