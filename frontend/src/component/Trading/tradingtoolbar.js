import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoinImg from "./coinimg";
import SelectCoin from "./selectcoin";
import UpDown from "./updown";

function TradingToolbar() {
    const [updownFlag, setUpdownFlag] = useState('up');
    const [currentIntegerPrice, setCurrentIntegerPrice] = useState();
    const [currentFloatrPrice, setCurrentFloatrPrice] = useState();
    const [highPrice, setHighPrice] = useState();
    const [lowPrice, setLowPrice] = useState();
    const [volume, setVolume] = useState();
    const { selectionCoinType } = useSelector(state => state.coin);
    const coinPrice = useSelector((state) => state.coinPrice);
    const { bitcoinPrice, bitcoinPriceUpDown, bitcoinHighPrice, bitcoinLowPrice, bitcoinVolume, ethereumPrice, ethereumPriceUpDown,ethereumHighPrice, ethereumLowPrice, ethereumVolume, solanaPrice, solanaPriceUpDown, solanaHighPrice, solanaLowPrice, solanaVolume, apePrice, apePriceUpDown, apeHighPrice, apeLowPrice, apeVolume, adaPrice, adaPriceUpDown, adaHighPrice, adaLowPrice, adaVolume } = coinPrice;

    useEffect(() => {   
        if(selectionCoinType == 'BTC') {
            setUpdownFlag(bitcoinPriceUpDown);
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(bitcoinPrice)));
            if(bitcoinPrice)
                setCurrentFloatrPrice(bitcoinPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "ETH") {
            setUpdownFlag(ethereumPriceUpDown);
            
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(ethereumPrice)));
            if(ethereumPrice)
                setCurrentFloatrPrice(ethereumPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "SOL") {
            setUpdownFlag(solanaPriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(solanaPrice)));
            if(solanaPrice)
                setCurrentFloatrPrice(solanaPrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "APE") {
            setUpdownFlag(apePriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(apePrice)));
            if(apePrice)
                setCurrentFloatrPrice(apePrice.toString().split('.')[1]);
        }
        if(selectionCoinType == "ADA") {
            setUpdownFlag(adaPriceUpDown);
           
            setCurrentIntegerPrice(Intl.NumberFormat().format(Math.floor(adaPrice)));
            if(adaPrice)
                setCurrentFloatrPrice(adaPrice.toString().split('.')[1]);
        }

      }, [selectionCoinType,bitcoinPrice,bitcoinPriceUpDown, ethereumPrice, ethereumPriceUpDown, solanaPrice, solanaPriceUpDown, apePrice, apePriceUpDown, adaPrice, adaPriceUpDown])
    useEffect(() => {
        if(selectionCoinType == 'BTC') {
            setHighPrice(bitcoinHighPrice);
            setLowPrice(bitcoinLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(bitcoinVolume));
        }
        if(selectionCoinType == "ETH") {
            setHighPrice(ethereumHighPrice);
            setLowPrice(ethereumLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(ethereumVolume));
        }
        if(selectionCoinType == "SOL") {
            setHighPrice(solanaHighPrice);
            setLowPrice(solanaLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(solanaVolume));
        }
        if(selectionCoinType == "APE") {
            setHighPrice(apeHighPrice);
            setLowPrice(apeLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(apeVolume));
        }
        if(selectionCoinType == "ADA") {
            setHighPrice(adaHighPrice);
            setLowPrice(adaLowPrice);
            setVolume(Intl.NumberFormat('en-GB', {
                notation: "compact",
                compactDisplay: "short"
              }).format(adaVolume));
        }
    }, [selectionCoinType, bitcoinHighPrice, bitcoinLowPrice,bitcoinVolume, ethereumHighPrice, ethereumLowPrice, ethereumVolume, solanaHighPrice, solanaLowPrice, solanaVolume, apeHighPrice, apeLowPrice, apeVolume, adaHighPrice, adaLowPrice, adaVolume])

    return (
            <>
                <div className="flex items-center mb-3">
                    <div>
                        <CoinImg></CoinImg>
                    </div>
                    <div className="ml-4 hidden md:block">
                        <UpDown state={updownFlag}></UpDown>
                    </div>
                    <div className={`ml-4 items-center text-lg ${updownFlag == 'up' ? 'text-[#72f238]' : 'text-[#ff4949]' } text-[20px] md:text-[32px]`}>{currentIntegerPrice}
                        <span className="text-[20px]">.{currentFloatrPrice || '00'}</span>
                    </div>
                    <div className="ml-4">
                        <SelectCoin></SelectCoin>
                    </div>
                </div>
                <div className="ml-5 whitespace-nowrap">
                    <div className="text-sm text-[#B1B6C6]">
                        24h Volume:&nbsp; 
                        <span className="text-white">
                        {
                            volume
                        } 
                        </span> 
                        · H: 
                        <span className="text-[#72F238]">
                            {highPrice}
                        </span>
                        · L: 
                        <span className="text-[#FF4949]">
                            {lowPrice}
                        </span>
                    </div>
                </div>
            </>   
    )
}

export default TradingToolbar;