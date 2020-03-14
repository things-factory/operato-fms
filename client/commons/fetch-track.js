const TRACKS = [
  [
    '37.5343626071, 126.9465174884',
    '37.5339606747, 126.9493037945',
    '37.5337439118, 126.9504485667',
    '37.5342784061, 126.9509043881',
    '37.5354201502, 126.9539838422',
    '37.5357487714, 126.9550322215',
    '37.5367069612, 126.9579568939',
    '37.5371259582, 126.9595027769',
    '37.5366304221, 126.9607348708',
    '37.5344828174, 126.9620433894',
    '37.5326572802, 126.963900286',
    '37.529349, 126.966155',
    '37.527193494, 126.9645186276',
    '37.5252500866, 126.964005685',
    '37.5236972645, 126.959676039',
    '37.5261482683, 126.9562789235',
    '37.5277168019, 126.9550134',
    '37.5301735631, 126.9545557512',
    '37.5301685887, 126.9530395553',
    '37.5324430889, 126.9495515487'
  ],
  [
    '37.5694603429, 126.9768521732',
    '37.5611650717, 126.9757104301',
    '37.5580109516, 126.9732327954',
    '37.5648478757, 126.9676562745',
    '37.5600938649, 126.9354978533',
    '37.5698024352, 126.9139297736',
    '37.5784735087, 126.9013921383',
    '37.6153888971, 126.8520384494',
    '37.6174966322, 126.8474323782',
    '37.6191481922, 126.8427721167',
    '37.6219319924, 126.8380819022',
    '37.6273243299, 126.8287078827',
    '37.6454703097, 126.7849057623',
    '37.6516830795, 126.7780213469',
    '37.6574042884, 126.7747047632',
    '37.667476695, 126.7661932101',
    '37.6700349176, 126.7616093054',
    '37.6723083331, 126.7564357024',
    '37.6763583639, 126.7475120758',
    '37.7201742008, 126.7187950284',
    '37.7226430245, 126.71748859',
    '37.7249361361, 126.7174917164',
    '37.7332094833, 126.7196467545',
    '37.7522974978, 126.7420362535'
  ],
  [
    '37.5064287101, 126.9685796262',
    '37.5072275886, 126.9664185848',
    '37.5083193477, 126.9633144842',
    '37.5083909947, 126.9613166971',
    '37.5075954262, 126.9651286598',
    '37.5064174411, 126.9680936685',
    '37.5056456746, 126.9711165758',
    '37.5024804162, 126.9769885604',
    '37.4975257209, 126.9832923729',
    '37.490902, 126.982473',
    '37.490902, 126.982473',
    '37.488220738, 126.982098293',
    '37.4832310433, 126.9818325082',
    '37.4806830109, 126.9816986741',
    '37.477237, 126.98152',
    '37.4767129386, 126.9779559316',
    '37.4760302441, 126.9728531855',
    '37.4763420666, 126.9654750252',
    '37.4778159718, 126.9618154597',
    '37.4797757723, 126.9568268388',
    '37.4829528114, 126.954099295',
    '37.485744783, 126.9555908386',
    '37.4864742597, 126.951301604',
    '37.4868703122, 126.9478349392',
    '37.4870619432, 126.9451608613',
    '37.4861987019, 126.9422316963',
    '37.4862491592, 126.9389864381',
    '37.4863786837, 126.9357089058',
    '37.4877271874, 126.931960391',
    '37.489965581, 126.9258896205',
    '37.4893791719, 126.9179428112',
    '37.4868249427, 126.9130820584',
    '37.4841475269, 126.9079705659',
    '37.4834116391, 126.9057067615',
    '37.4836800753, 126.9027434933',
    '37.4846723472, 126.9073136324',
    '37.4863686607, 126.9135080128',
    '37.4843005589, 126.9139628622',
    '37.4829526761, 126.9142613713',
    '37.4803380107, 126.9148256152',
    '37.4769928277, 126.9154895441',
    '37.475296262, 126.9167760272',
    '37.4740935962, 126.9172935605',
    '37.4727455105, 126.9189667556',
    '37.4706701882, 126.9198160281',
    '37.4674282538, 126.9204715576',
    '37.4654220641, 126.9196653323',
    '37.4636206537, 126.9189371062'
  ]
]

export function fetchTrack() {
  return TRACKS[~~(Math.random() * TRACKS.length)].map((position, idx) => {
    var [lat, lng] = position.split(',').map(pos => Number(pos))
    return {
      name: idx,
      lat,
      lng,
      parameters: {
        temperature: ~~(Math.random() * 100),
        humidity: ~~(Math.random() * 100),
        illuminance: ~~(Math.random() * 1000),
        shock: ~~(Math.random() * 100),
        airPressure: ~~(Math.random() * 1500),
        breakdown: !!~~(Math.random() * 2)
      }
    }
  })
}