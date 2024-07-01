import fetch from "node-fetch";
import 'dotenv/config'

const FROM = "HKI"
const TO = "ROI"
const DATE = "2025-03-01"

const resp = await fetch("https://www.vr.fi/api/v7", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-bff-version": "2",
    "x-vr-requestid": "e52b46ce-7e8a-490c-8c9e-eb1fe5dc0cb1",
    "x-vr-sessionid": "66659d96-8ce6-42a6-9ac2-ffadfbb844dc",
    "cookie": "loggedIn=false; loggedIn.sig=euNdCyAywiIFkWKemcYMz_pgND4; access_token=CbxkuYX9Vrf8gh7Tnj2vlaaLeR9X67yAV1QWwPmVAvB3nm5Ku/klPYTxsDCopMTsa5bjCJNbx+LB58xYWCJWoqxP5FVKCqkWjjop5AbIPmtSqajkOC/ZdMQwMNW6tUETOAyTq19Bvl5vCWEw17PuNUVViVxFba8SqOV0SZ+1MkUs5fjnJJJhqwjkxXsLIPeXRQZFYgFM3STASPxBWo6Brxo3U6iMyfeExoJqEpdpGmCCvO1+Nm+Sz3ffd6T44LqcVmRGFB/o/8sg5hX47/waXMiY/+d4sG4cdu1WHjrho5s3q2t/uP5Im+BxQf2WIJ637PT9ABdqso8NVqxPGCmSspgqBfPCItDAGDB/A567X5mwWMS19M/5yWjcPit5QCx6b1wHFCo99wrbDF8r294IkYvZnWM2jmC0DlJr1gb7dRFlLnP2shZOF/FXt/n0P9znjJp1M6MFc4ZOvcgIMETIQtcFnFngma+EyrFr6tNmb15kTBW8iGkyRiKXCsAw4BJujEsO1xBZk738eH+74O3rkbudGpp4bbS0F8GnxHXzrcHWrQTD3fd3yKf/0fc/EJ1XuhxZH9iSYKhKO2HR0+SSHLmk8sgFk7YIfcKh06clyOovY4Kuu44n9VtkbNCjiBuDebEHTaLnbxmZKwNBTataGE2b0OIEiQmiUGMuX4H8X1HF9kfkfPx7O9Ok5/bRko+VIMdvt5OZqAYn1fJA46lSihr7qDk1vpOlScVHQZEZFtwRKMo+IZbgtf1eoBeUUMkHUd4nhR0GzYdkRrxcYKTrm/0ygThsBFQ45LuJpxSVHCc1wX1TSa+zqx0fldzExfZS; access_token.sig=zxuS6kK-JrsuK_Vnc1WxJW8HAfg; access_token.iv=1e2ef9e902fe8ca3; refresh_token=OBUaQwPtLf6x6V2on26lqYCUJkzStw==; refresh_token.sig=3TVjLiOpDlYMt53y9nKRZtfXlJg; refresh_token.iv=ad7bf87075288412",
    "Referer": "https://www.vr.fi/",
    "Referrer-Policy": "origin"
  },
  "body": `{\"operationName\":\"searchJourney\",\"variables\":{\"filters\":[],\"arrivalStation\":\"${TO}\",\"departureStation\":\"${FROM}\",\"departureDateTime\":\"${DATE}\",\"passengers\":[{\"key\":\"9ed71694-7128-4c45-bf14-9da2d1c76dff\",\"type\":\"ADULT\",\"wheelchair\":false,\"vehicles\":[]}],\"placeTypes\":[\"SEAT\",\"CABIN_BED\"]},\"query\":\"fragment JourneyOptionPassenger on JourneyOptionPassenger {\\n  type\\n  offers {\\n    legId\\n    product\\n    price\\n    discountCategory\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment JourneyOption on JourneyOption {\\n  id\\n  departureTime\\n  departureStation\\n  arrivalStation\\n  arrivalTime\\n  legs {\\n    ...JourneyOptionLeg\\n    __typename\\n  }\\n  totalPrice\\n  discount {\\n    discountPercentage\\n    ids\\n    __typename\\n  }\\n  error\\n  passengers {\\n    ...JourneyOptionPassenger\\n    __typename\\n  }\\n  availability {\\n    ...OptionAvailability\\n    __typename\\n  }\\n  highestLegTrainFill\\n  __typename\\n}\\n\\nfragment ProductAttribute on ProductAttribute {\\n  name\\n  attribute\\n  availability\\n  __typename\\n}\\n\\nfragment JourneyOptionLeg on JourneyOptionLeg {\\n  legKey\\n  trainNumber\\n  trainType\\n  trainAttributes\\n  type\\n  commercialLineIdentifier\\n  departureStation\\n  departureTime\\n  arrivalStation\\n  arrivalTime\\n  trainFillPercentage\\n  productAttributes {\\n    ...ProductAttribute\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment OptionAvailability on OptionAvailability {\\n  seatAvailability_v2\\n  accessibleSeatAvailability\\n  petSeatAvailability\\n  cabinAvailability\\n  petCabinAvailability\\n  accessibleCabinAvailability\\n  __typename\\n}\\n\\nquery searchJourney($departureStation: String!, $arrivalStation: String!, $departureDateTime: DateTime!, $passengers: [PassengerInput!]!, $filters: [ConnectionFilter]! = [], $placeTypes: [PlaceType!]!, $bundleId: String, $companyId: String) {\\n  searchJourney(\\n    departureStation: $departureStation\\n    arrivalStation: $arrivalStation\\n    departureDateTime: $departureDateTime\\n    passengers: $passengers\\n    filters: $filters\\n    placeTypes: $placeTypes\\n    bundleId: $bundleId\\n    companyId: $companyId\\n  ) {\\n    ...JourneyOption\\n    __typename\\n  }\\n}\"}`,
  "method": "POST"
});

const text = await resp.text()
if (text.includes("ExternalServiceError")) {
    console.log("not yet!")
} else {
    console.log("Avaliable!")
    const resp = await fetch(process.env.DISCORD_WEBHOOK_URL || "", 
        {
            method: "POST",
            body: JSON.stringify({
                content: "<@1101508982570504244> ```\n*Junaliput saatavilla!* 🚂 \nJunaliput on nyt ostettavissa! (tämä viesti on lähetetty automaattisesti)```"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

    console.log(await resp.text())
}
