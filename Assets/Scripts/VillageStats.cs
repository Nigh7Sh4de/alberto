public class VillageInfoProps {
    public int villagers;
    public int idols;
}

public class VillagePlayerStats
{
    
    public VillageInfoProps mainPool;
    public VillageInfoProps buildPool;
    public VillagePlayerStats()
    {
        mainPool = new VillageInfoProps();
        buildPool = new VillageInfoProps();
    }
}

public class VillageStats
{

    public VillagePlayerStats[] players;
}