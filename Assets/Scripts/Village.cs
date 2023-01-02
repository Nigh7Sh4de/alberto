using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Village : MonoBehaviour
{

  public VillageInfo villageInfoPrefab;
  private VillageInfo villageInfo;
  public GameObject sideMenu;
  public VillageStats stats;
  private float timer;

  void Start()
  {
    stats = new VillageStats();
    villageInfo = Instantiate(villageInfoPrefab, sideMenu.transform);
    villageInfo.villageStats = stats;
  }

  void Update()
  {
    timer += Time.deltaTime;
    stats.villagers = Mathf.FloorToInt(timer);
  }
}
