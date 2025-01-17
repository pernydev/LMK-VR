import fetch from "node-fetch";
import 'dotenv/config'

const FROM = "HKI"
const TO = "ROI"
const DATE = "2025-04-01"

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
    "Referer": "https://www.vr.fi/",
    "Referrer-Policy": "origin"
  },
  "body": `{\"operationName\":\"searchJourney\",\"variables\":{\"filters\":[],\"arrivalStation\":\"${TO}\",\"departureStation\":\"${FROM}\",\"departureDateTime\":\"${DATE}\",\"passengers\":[{\"key\":\"9ed71694-7128-4c45-bf14-9da2d1c76dff\",\"type\":\"ADULT\",\"wheelchair\":false,\"vehicles\":[]}],\"placeTypes\":[\"SEAT\",\"CABIN_BED\"]},\"query\":\"fragment JourneyOptionPassenger on JourneyOptionPassenger {\\n  type\\n  offers {\\n    legId\\n    product\\n    price\\n    discountCategory\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment JourneyOption on JourneyOption {\\n  id\\n  departureTime\\n  departureStation\\n  arrivalStation\\n  arrivalTime\\n  legs {\\n    ...JourneyOptionLeg\\n    __typename\\n  }\\n  totalPrice\\n  discount {\\n    discountPercentage\\n    ids\\n    __typename\\n  }\\n  error\\n  passengers {\\n    ...JourneyOptionPassenger\\n    __typename\\n  }\\n  availability {\\n    ...OptionAvailability\\n    __typename\\n  }\\n  highestLegTrainFill\\n  __typename\\n}\\n\\nfragment ProductAttribute on ProductAttribute {\\n  name\\n  attribute\\n  availability\\n  __typename\\n}\\n\\nfragment JourneyOptionLeg on JourneyOptionLeg {\\n  legKey\\n  trainNumber\\n  trainType\\n  trainAttributes\\n  type\\n  commercialLineIdentifier\\n  departureStation\\n  departureTime\\n  arrivalStation\\n  arrivalTime\\n  trainFillPercentage\\n  productAttributes {\\n    ...ProductAttribute\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment OptionAvailability on OptionAvailability {\\n  seatAvailability_v2\\n  accessibleSeatAvailability\\n  petSeatAvailability\\n  cabinAvailability\\n  petCabinAvailability\\n  accessibleCabinAvailability\\n  __typename\\n}\\n\\nquery searchJourney($departureStation: String!, $arrivalStation: String!, $departureDateTime: DateTime!, $passengers: [PassengerInput!]!, $filters: [ConnectionFilter]! = [], $placeTypes: [PlaceType!]!, $bundleId: String, $companyId: String) {\\n  searchJourney(\\n    departureStation: $departureStation\\n    arrivalStation: $arrivalStation\\n    departureDateTime: $departureDateTime\\n    passengers: $passengers\\n    filters: $filters\\n    placeTypes: $placeTypes\\n    bundleId: $bundleId\\n    companyId: $companyId\\n  ) {\\n    ...JourneyOption\\n    __typename\\n  }\\n}\"}`,
  "method": "POST"
});

const text = await resp.text()
if (text.includes('errors":[{"message')) {
    console.log("not yet!", text)
} else {
    console.log("Avaliable!", text)
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
