import { Sprite } from 'UnityEngine';
import { Button, Image, Scrollbar } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import CoinManager from './ItemCollectionManager';
import { CollectInfo } from './ItemCollectionManager';

export default class UIManager extends ZepetoScriptBehaviour {
    public maxPoints = 10;
    
    public healthBarFull: Sprite;
    public healthBarEmpty: Sprite;
    
    public healthBars: Image[];
    public points: Scrollbar;
    
    private maxHealthIndex : number = 2;
    private currentHealthIndex : number = 0;
    
    
    public Start()
    {
        CoinManager.GetInstance().AddListener((info) => {this.OnItemCollect(info);});
    }
    
    public OnItemCollect(info: CollectInfo)
    {
        if (info.tag == "Point")
            this.GetPoints(info.value);
        else if (info.tag == "Health")
        {
            if (this.currentHealthIndex >= 0 && this.currentHealthIndex <= this.maxHealthIndex )
            {
                this.currentHealthIndex--;
                this.SetHealthBar(this.currentHealthIndex, true);
            }
        } else if (info.tag == "Enemy")
        {
            if (this.currentHealthIndex < this.maxHealthIndex )
            {
                this.SetHealthBar(this.currentHealthIndex, false);
                this.currentHealthIndex++;
            }
        }
            
    }
    
    public SetHealthBar(index: number, active: boolean)
    {
        let bar: Image = this.healthBars[index];
        if (active)
            bar.sprite = this.healthBarFull;
        else
            bar.sprite = this.healthBarEmpty;
    }
    
    public GetPoints(value: number)
    {
        let curValue = this.points.size / this.maxPoints;
        this.points.size = curValue + (value / this.maxPoints);
    }
}