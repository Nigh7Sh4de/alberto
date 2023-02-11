using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

[System.Serializable]
public class VillageStats
{
    public int villagers;
    public int idols;
}

[System.Serializable]
public class VillageInfoProps
{
    public VillageInfoProps()
    {
        mainPool = new VillageStats();
        idolPool = new VillageStats();
    }
    public VillageStats mainPool;
    public VillageStats idolPool;
}

public class VillageInfo : MonoBehaviour
{
    public VillageInfoProps villageStats;
    private VillageInfoProps oldVillageStats;
    [SerializeField] private TextMeshProUGUI villagersText;
    [SerializeField] private TextMeshProUGUI idolsText;
    [SerializeField] public Toggle idolToggle;

    void Start()
    {
    }

    void Update()
    {
        if (villageStats != oldVillageStats)
        {
            villagersText.text = "Villagers: " + villageStats.mainPool.villagers;
            idolsText.text = "Idols: " + villageStats.mainPool.idols;
            if (villageStats.idolPool.villagers > 0)
            {
                idolsText.text += " [" + villageStats.idolPool.villagers + " / 50]";
            }
        }
    }
}
