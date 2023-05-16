using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class VillageInfoStat : MonoBehaviour
{
    public VillageStats villageStats;
    private VillageStats oldVillageStats;
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
            foreach (int i = 0; i < playerI) {
                VillagePlayerStats playerInfo = villageStats.players[player.villageStatsIndex];
                villagersText.text = "Villagers: " + playerInfo.mainPool.villagers;
                idolsText.text = "Idols: " + playerInfo.mainPool.idols;
                if (playerInfo.buildPool.villagers > 0)
                {
                    idolsText.text += " [" + playerInfo.idolPool.villagers + " / 50]";
                }
            }
        }
    }
}
