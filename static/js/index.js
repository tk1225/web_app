
const make_rader_charts=function(data1,data2,data3,data4,data5){
  console.log(data1,data2,data3,data4,data5)
var ctx = document.getElementById("chart");
var myRadarChart2 = new Chart(ctx, {
  
  //グラフの種類
  type: 'radar',
  //データの設定
  data: {
      //データ項目のラベル
      labels: ["DCF", "PBR", "PER", "ROA", "ROE"],
      //データセット
      datasets: [
          {
             //凡例のラベル
              label: "〇〇",
              //背景色
              backgroundColor: "rgba(200,112,126,0.3)",
              //枠線の色
              borderColor: "rgba(200,112,126,1)",
              //結合点の背景色
              pointBackgroundColor: "rgba(200,112,126,1)",
              //結合点の枠線の色
              pointBorderColor: "#fff",
              //結合点の背景色（ホバーしたとき）
              pointHoverBackgroundColor: "#fff",
              //結合点の枠線の色（ホバーしたとき）
              pointHoverBorderColor: "rgba(200,112,126,1)",
              //結合点より外でマウスホバーを認識する範囲（ピクセル単位）
              hitRadius: 5,
              //グラフのデータ
              data: [data1,data2,data3,data4,data5]
          },
          {
             //凡例のラベル
              label: "△△",
              //背景色
              backgroundColor: "rgba(80,126,164,0.3)",
              //枠線の色
              borderColor: "rgba(80,126,164,1)",
              //結合点の背景色
              pointBackgroundColor: "rgba(80,126,164,1)",
              //結合点の枠線の色
              pointBorderColor: "#fff",
              //結合点の背景色（ホバーしたとき）
              pointHoverBackgroundColor: "#fff",
              //結合点の枠線の色（ホバーしたとき）
              pointHoverBorderColor: "rgba(80,126,164,1)",
              //結合点より外でマウスホバーを認識する範囲（ピクセル単位）
              hitRadius: 5,
              //グラフのデータ
              data: [3,3,3,3,3]
          }
      ]
  },
 options: {
     // 凡例非表示
    legend: {
        display: false
     },
    // レスポンシブ指定
    responsive: true,
    scale: {
        
      ticks: {
        // 最小値の値を0指定
        beginAtZero:true,
        min: 0,
        // 最大値を指定
        max: 5,
      }
    },
    maintainAspectRatio: false,
    
  }
});
}
//初期画面
make_rader_charts(1,2,3,4,5)

const make_company_stats=function(object){
  
    $("#financial_summary").empty();
  const h=`<div id="main-gallery">
  <div class="gallery-cell">
      <div class="gallery-cell_inner">
          <table >
              <tr>
                <th>PER</th>
                <td>${Math.round(object["priceEarningsRatio"]*10)/10}</td>
                
              </tr>
              <tr>
                <th>PBR</th>
                <td>${Math.round(object["priceToBookRatio"]*10)/10}</td>
              
              </tr>
              <tr>
                <th>PSR</th>
                <td>${Math.round(object["priceToSalesRatio"]*10)/10}</td>
               
              </tr>
      
          </table>
      </div>
  </div>
  <div class="gallery-cell">
    <div class="gallery-cell_inner">
      <table >
          <tr>
            <th>ROA</th>
            <td>${Math.round(object["returnOnAssets"]*10)/10}</td>
            
          </tr>
          <tr>
            <th>ROE</th>
            <td>${Math.round(object["returnOnEquity"]*10)/10}</td>
          
          </tr>
          <tr>
            <th>CCC</th>
            <td>${Math.round(object["cashConversionCycle"]*10)/10}</td>
           
          </tr>
  
      </table>
  </div>

  </div>
  <div class="gallery-cell">
    <div class="gallery-cell_inner">
      <table >
          <tr>
            <th>流動比率</th>
            <td>${Math.round(object["currentRatio"]*10)/10}</td>
            
          </tr>
          <tr>
            <th>当座比率</th>
            <td>${Math.round(object["quickRatio"]*10)/10}</td>
          
          </tr>
          <tr>
            <th>現金比率</th>
            <td>${Math.round(object["cashRatio"]*10)/10}</td>
           
          </tr>
  
      </table>
  </div>
  </div>
 
    </div>`
    $("#financial_summary").append(h);

    //カルーセルを表示
    $("#main-gallery").flickity({
    // options
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
  
});

}
//初期画面






const Serch_data=()=>{
  //flask側にAPIをたたく
  const ticker=$("#search").val();
  console.log(ticker);

  //APIを同時に呼ぶ
  
  axios.all([
    //axios.postをリストで渡す
    axios.post(`/api`,{"ticker": ticker}),
    axios.post(`/api_ratio`,{"ticker": ticker}),
    axios.post(`/api_score`,{"ticker": ticker}),
    axios.post(`/stock_price`,{"ticker": ticker})
    ])
    .then(axios.spread((response1, response2,response3,response4) => {
     
      console.log('data1', response1, 'data2', response2,
      'data3', response3,'data4', response4)
        //企業概要をカラにする
      $("#company_detail").empty();
      const h=` <tr>
        <th>企業名</th>
        <td>${response1.data["companyName"]}</td>
      </tr>
      <tr>
        <th>株価</th>
        <td>${response1.data["price"]}</td>
      </tr>
      <tr>
        <th>前日比</th>
        <td>${response1.data["changes"]}</td>
      </tr>
      <tr>
        <th>業界</th>
        <td>${response1.data["sector"]}</td>
                </tr>`
        //企業概要を更新する
      $("#company_detail").append(h);
      
      //円グラフを洗い替え
      
      let DCFScore=response3.data["ratingDetailsDCFScore"]
      let PBRScore=response3.data["ratingDetailsPBScore"]
      let PERScore=response3.data["ratingDetailsPEScore"]
      let ROAScore=response3.data["ratingDetailsROAScore"]
      let ROEScore=response3.data["ratingDetailsROEScore"]    
      make_rader_charts(DCFScore,PBRScore,PERScore,ROAScore,ROEScore)

      console.log(response2.data)
      make_company_stats(response2.data)
     
      console.log(response4.data["historical"][0]["adjClose"])
      console.log(response4.data["historical"][0]["date"])
      let x=[]
      let y=[]

      for(let i = 0; i< response4.data["historical"].length ; i++){
        x.push(response4.data["historical"][i]["date"])
        y.push(response4.data["historical"][i]["adjClose"])
    }
    make_charts(x,y)


    }));
}

$("#search_btn").on("click",function(){
  console.log("ボタン押下")
  Serch_data()
})




$(function() {

  let stocklist = ['A',
'AA',
'AAL',
'AAP',
'AAPL',
'ABBV',
'ABC',
'ABMD',
'ABNB',
'ABT',
'ACA',
'ACGL',
'ACHC',
'ACM',
'ACN',
'ADBE',
'ADI',
'ADM',
'ADNT',
'ADP',
'ADS',
'ADSK',
'ADT',
'AEE',
'AEP',
'AES',
'AEYE',
'AFG',
'AFL',
'AFRM',
'AGCO',
'AGIO',
'AGR',
'AGS',
'AI',
'AIG',
'AIZ',
'AJG',
'AKAM',
'AL',
'ALB',
'ALGN',
'ALK',
'ALKS',
'ALL',
'ALLE',
'ALLK',
'ALLY',
'ALNY',
'ALRM',
'ALSN',
'ALXN',
'AMAT',
'AMBA',
'AMC',
'AMCX',
'AMD',
'AME',
'AMG',
'AMGN',
'AMP',
'AMWL',
'AMZN',
'AN',
'ANET',
'ANSS',
'ANTM',
'AON',
'AOS',
'APA',
'APD',
'APH',
'APLS',
'APPF',
'APPS',
'APTV',
'ARD',
'ARES',
'ARMK',
'ARW',
'ASB',
'ASH',
'ATH',
'ATNX',
'ATO',
'ATUS',
'ATVI',
'AVGO',
'AVLR',
'AVT',
'AVY',
'AWI',
'AWK',
'AWR',
'AXP',
'AXS',
'AXTA',
'AZO',
'AZPN',
'AZRE',
'BA',
'BAC',
'BAH',
'BAX',
'BBBY',
'BBY',
'BC',
'BCE',
'BDX',
'BE',
'BEN',
'BG',
'BHF',
'BIGC',
'BIIB',
'BIO',
'BK',
'BKI',
'BKNG',
'BKR',
'BL',
'BLDP',
'BLI',
'BLK',
'BLL',
'BLUE',
'BMO',
'BMRN',
'BMY',
'BOH',
'BOKF',
'BOOT',
'BPMC',
'BR',
'BRK.B',
'BRKR',
'BRO',
'BSIG',
'BSX',
'BURL',
'BWA',
'BX',
'BYND',
'C',
'CAG',
'CAH',
'CAKE',
'CARG',
'CASY',
'CAT',
'CB',
'CBRE',
'CC',
'CCK',
'CCL',
'CDAY',
'CDK',
'CDNS',
'CDW',
'CE',
'CERN',
'CF',
'CFG',
'CFX',
'CGC',
'CGNX',
'CHD',
'CHK',
'CHRW',
'CHTR',
'CHWY',
'CHX',
'CI',
'CINF',
'CIT',
'CL',
'CLBK',
'CLGX',
'CLH',
'CLR',
'CLX',
'CMA',
'CMCSA',
'CME',
'CMG',
'CMI',
'CMS',
'CNA',
'CNC',
'CNDT',
'CNK',
'CNNE',
'CNP',
'CNX',
'COF',
'COG',
'COHR',
'COLM',
'COO',
'COP',
'COST',
'COTY',
'COUP',
'CPA',
'CPB',
'CPRI',
'CPRT',
'CRI',
'CRM',
'CRNC',
'CRON',
'CRSP',
'CRWD',
'CSCO',
'CSL',
'CSX',
'CTAS',
'CTLT',
'CTSH',
'CTVA',
'CTXS',
'CVA',
'CVE',
'CVET',
'CVNA',
'CVS',
'CVX',
'CWK',
'CWT',
'CYBR',
'CYD',
'CYRX',
'D',
'DAC',
'DAL',
'DASH',
'DBX',
'DCI',
'DD',
'DDD',
'DDOG',
'DE',
'DELL',
'DFS',
'DG',
'DGX',
'DHI',
'DHR',
'DIS',
'DISCA',
'DISH',
'DKNG',
'DKS',
'DLB',
'DLTR',
'DOCU',
'DOOR',
'DOV',
'DOW',
'DPZ',
'DRI',
'DRVN',
'DTE',
'DUK',
'DVA',
'DVN',
'DXC',
'DXCM',
'EA',
'EAF',
'EBAY',
'EBS',
'ECL',
'ED',
'EDIT',
'EFX',
'EIX',
'EL',
'ELAN',
'EMCF',
'EMN',
'EMR',
'ENB',
'ENPH',
'ENR',
'ENV',
'EOG',
'EPAM',
'EQH',
'EQT',
'ES',
'ESTC',
'ETN',
'ETR',
'ETSY',
'EVRG',
'EVTC',
'EW',
'EWBC',
'EXAS',
'EXC',
'EXP',
'EXPD',
'EXPE',
'F',
'FAF',
'FANG',
'FAST',
'FATE',
'FB',
'FBHS',
'FBP',
'FCX',
'FDS',
'FDX',
'FE',
'FEYE',
'FFIV',
'FHB',
'FHN',
'FICO',
'FIS',
'FISV',
'FITB',
'FIVN',
'FL',
'FLEX',
'FLIR',
'FLO',
'FLR',
'FLS',
'FLT',
'FMC',
'FNB',
'FND',
'FNKO',
'FRC',
'FROG',
'FRPT',
'FSLR',
'FSLY',
'FTI',
'FTNT',
'FTV',
'FVRR',
'GAN',
'GCI',
'GD',
'GDDY',
'GDRX',
'GE',
'GGG',
'GHLD',
'GIB',
'GILD',
'GIS',
'GL',
'GLW',
'GM',
'GNTX',
'GO',
'GOOG',
'GOOGL',
'GOOS',
'GPC',
'GPN',
'GPS',
'GRA',
'GRMN',
'GRUB',
'GS',
'GSHD',
'GT',
'GTES',
'GTXMQ',
'GWW',
'H',
'HAIN',
'HAL',
'HAS',
'HBAN',
'HBI',
'HCA',
'HD',
'HE',
'HEI',
'HES',
'HFBL',
'HFC',
'HGV',
'HIG',
'HII',
'HLT',
'HMHC',
'HNGR',
'HOG',
'HOLX',
'HON',
'HP',
'HPE',
'HPQ',
'HRB',
'HRC',
'HRL',
'HSIC',
'HSY',
'HUBS',
'HUM',
'HUN',
'HWM',
'HXL',
'IBM',
'ICE',
'ICHR',
'IDXX',
'IEX',
'IFF',
'IGT',
'ILMN',
'INCY',
'INFO',
'INGR',
'INMD',
'INTC',
'INTU',
'IP',
'IPG',
'IPGP',
'IPHI',
'IQV',
'IRBT',
'ISRG',
'IT',
'ITT',
'ITW',
'IVZ',
'J',
'JAMF',
'JAZZ',
'JBHT',
'JBL',
'JCI',
'JEF',
'JELD',
'JKHY',
'JNJ',
'JNPR',
'JPM',
'JWN',
'K',
'KAR',
'KBH',
'KDP',
'KEY',
'KEYS',
'KHC',
'KL',
'KLAC',
'KMB',
'KMI',
'KMX',
'KNX',
'KO',
'KOS',
'KR',
'KRUS',
'KRYS',
'KSS',
'KSU',
'L',
'LAZ',
'LAZR',
'LB',
'LDOS',
'LEA',
'LECO',
'LEG',
'LEN',
'LEVI',
'LH',
'LHX',
'LILAK',
'LIN',
'LITE',
'LKQ',
'LLY',
'LMT',
'LNC',
'LNT',
'LOW',
'LPLA',
'LRCX',
'LSTR',
'LULU',
'LUMN',
'LUV',
'LVS',
'LW',
'LYB',
'LYFT',
'LYV',
'M',
'MA',
'MANH',
'MAR',
'MAS',
'MAT',
'MAX',
'MCD',
'MCHP',
'MCK',
'MCO',
'MDB',
'MDLA',
'MDLZ',
'MDT',
'MDU',
'MELI',
'MESA',
'MET',
'MGM',
'MGY',
'MHK',
'MIDD',
'MKC',
'MKL',
'MKSI',
'MKTX',
'MLM',
'MMC',
'MMM',
'MNST',
'MO',
'MOH',
'MORN',
'MOS',
'MPC',
'MRK',
'MRNA',
'MRO',
'MRVL',
'MS',
'MSCI',
'MSFT',
'MSGS',
'MSI',
'MSM',
'MTB',
'MTCH',
'MTD',
'MTN',
'MU',
'MUR',
'MXIM',
'NATI',
'NAVI',
'NCLH',
'NCNO',
'NCR',
'NDAQ',
'NDSN',
'NEE',
'NEM',
'NET',
'NEWR',
'NEX',
'NFG',
'NFLX',
'NI',
'NKE',
'NKLA',
'NKTR',
'NLOK',
'NLSN',
'NMIH',
'NOC',
'NOV',
'NOW',
'NRG',
'NSC',
'NTAP',
'NTB',
'NTNX',
'NTRS',
'NUAN',
'NUE',
'NUS',
'NVAX',
'NVDA',
'NVEE',
'NVR',
'NVT',
'NVTA',
'NWL',
'NWS',
'NWSA',
'NXPI',
'NYCB',
'OC',
'ODFL',
'OFG',
'OGE',
'OKE',
'OKTA',
'OLED',
'OLLI',
'OMC',
'OMCL',
'ON',
'OPRT',
'ORCL',
'ORI',
'ORLY',
'OSW',
'OXY',
'PACW',
'PAGS',
'PANW',
'PARR',
'PAYC',
'PAYS',
'PAYX',
'PBCT',
'PBF',
'PCAR',
'PCG',
'PCTY',
'PD',
'PEG',
'PEGA',
'PEP',
'PFE',
'PFG',
'PFIS',
'PFPT',
'PG',
'PGR',
'PH',
'PHM',
'PII',
'PINS',
'PKG',
'PKI',
'PLAN',
'PLMR',
'PLTK',
'PLTR',
'PLUG',
'PM',
'PNC',
'PNR',
'PNW',
'PODD',
'POOL',
'POSH',
'POST',
'POWI',
'PPC',
'PPG',
'PPL',
'PRAH',
'PRGO',
'PRU',
'PS',
'PSTG',
'PSX',
'PTC',
'PTON',
'PVH',
'PWR',
'PXD',
'PYPL',
'QCOM',
'QDEL',
'QEP',
'QGEN',
'QLYS',
'QRTEA',
'QRVO',
'R',
'RACE',
'RCL',
'RDWR',
'RE',
'REAL',
'REGN',
'REZI',
'RF',
'RGLD',
'RHI',
'RIDE',
'RIG',
'RJF',
'RKT',
'RL',
'RLGY',
'RMD',
'RNG',
'RNR',
'ROK',
'ROKU',
'ROL',
'ROOT',
'ROP',
'ROST',
'RPD',
'RPM',
'RPRX',
'RRC',
'RSG',
'RTX',
'RUN',
'RXT',
'SABR',
'SBLK',
'SBUX',
'SC',
'SCCO',
'SCHW',
'SCI',
'SDC',
'SEDG',
'SEE',
'SEER',
'SEIC',
'SFL',
'SFM',
'SGEN',
'SHAK',
'SHOP',
'SHW',
'SIRI',
'SIVB',
'SIX',
'SJM',
'SKX',
'SLB',
'SLF',
'SLM',
'SMAR',
'SMMF',
'SNA',
'SNOW',
'SNPS',
'SO',
'SPB',
'SPCE',
'SPGI',
'SPLK',
'SPOT',
'SPR',
'SQ',
'SRCL',
'SRE',
'SRPT',
'SSNC',
'ST',
'STAA',
'STE',
'STLD',
'STNE',
'STNG',
'STT',
'STX',
'STZ',
'SUM',
'SUMO',
'SWI',
'SWK',
'SWKS',
'SYF',
'SYK',
'SYNH',
'SYY',
'T',
'TAP',
'TCBI',
'TCDA',
'TDC',
'TDG',
'TDOC',
'TDS',
'TDY',
'TEAM',
'TECK',
'TEL',
'TER',
'TEX',
'TFC',
'TFX',
'TGT',
'THG',
'THO',
'THS',
'TJX',
'TKR',
'TMO',
'TMUS',
'TMX',
'TNDM',
'TNL',
'TOL',
'TPR',
'TRGP',
'TRIP',
'TRMB',
'TRN',
'TROW',
'TROX',
'TRP',
'TRU',
'TRUP',
'TRV',
'TSCO',
'TSLA',
'TSN',
'TT',
'TTC',
'TTD',
'TTWO',
'TW',
'TWLO',
'TWNK',
'TWOU',
'TWTR',
'TXG',
'TXN',
'TXT',
'TYL',
'U',
'UA',
'UAA',
'UAL',
'UBER',
'UBS',
'UFS',
'UGI',
'UHS',
'UI',
'ULTA',
'UMPQ',
'UNH',
'UNM',
'UNP',
'UPS',
'UPWK',
'URBN',
'URI',
'USB',
'USFD',
'UTHR',
'V',
'VAR',
'VBTX',
'VEEV',
'VFC',
'VIAC',
'VIR',
'VIRT',
'VLO',
'VMC',
'VMW',
'VOYA',
'VRRM',
'VRSK',
'VRSN',
'VRTX',
'VST',
'VTRS',
'VVV',
'VXRT',
'VYGR',
'VZ',
'WAB',
'WAT',
'WBA',
'WBS',
'WCC',
'WDAY',
'WDC',
'WDFC',
'WEC',
'WEN',
'WEX',
'WFC',
'WH',
'WHD',
'WHR',
'WISH',
'WKHS',
'WLL',
'WLTW',
'WM',
'WMB',
'WMT',
'WORK',
'WPM',
'WRB',
'WRK',
'WSC',
'WSM',
'WSO',
'WST',
'WTFC',
'WTRG',
'WU',
'WVFC',
'WWE',
'WYNN',
'X',
'XEC',
'XEL',
'XLNX',
'XOGAQ',
'XOM',
'XRAY',
'XRX',
'XYL',
'Y',
'YETI',
'YUM',
'YUMC',
'Z',
'ZBH',
'ZBRA',
'ZEN',
'ZG',
'ZI',
'ZION',
'ZM',
'ZNGA',
'ZS',
'ZTS',
'ZUO'];
  // 入力補完を実施する要素に単語リストを設定
  $("#search").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(stocklist, request.term);
  
        response(results.slice(0, 10));
    }
  });



});

const make_charts=(x_data,y_data)=>{
// 株価グラフ
var trace1 = {
  x: x_data,
  y: y_data,
  type: 'scatter'
};
var data = [trace1];

Plotly.newPlot('main_graph', data);
}







