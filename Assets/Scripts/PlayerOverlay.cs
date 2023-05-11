using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlayerOverlay : MonoBehaviour
{
    private Image image;
    public TMP_Dropdown playerDropdown;

    void Start() {
        image = GetComponent<Image>();
    }

    void Update()
    {
        if (image && playerDropdown) {
            switch (playerDropdown.value) {
                case 0:
                    image.color = new Color(0, 0, 1, 0.5f);
                    break;
                case 1:
                    image.color = new Color(1, 0, 0, 0.5f);
                    break;
            }
        }
    }
}
