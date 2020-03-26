const TRACKS = [
  [
    '37.4852999247, 126.8752357351',
    '37.4854833365, 126.8764676081',
    '37.4850859266, 126.8766480399',
    '37.4821798697, 126.8779542784',
    '37.4795455423, 126.8799395888',
    '37.4808098191, 126.8815009072',
    '37.4817860336, 126.8810457608',
    '37.4856016324, 126.8793106619',
    '37.48993684, 126.8758794067',
    '37.4914025582, 126.8745580878',
    '37.4887667516, 126.8763627957',
    '37.4813518257, 126.8867888001',
    '37.478688381, 126.8933632314',
    '37.4783929763, 126.8955649777',
    '37.4800492248, 126.9055651074',
    '37.4807015612, 126.9091308055',
    '37.4818905995, 126.9155941872',
    '37.4824601836, 126.9185916485',
    '37.4828682465, 126.9208025963',
    '37.483857, 126.927447',
    '37.482488, 126.929748',
    '37.4777737201, 126.9330265488',
    '37.4755082532, 126.9364125285',
    '37.4727178154, 126.9330225637',
    '37.4705798059, 126.9381665384',
    '37.4706493056, 126.9420147044',
    '37.4682107158, 126.9465116717',
    '37.4672780307, 126.9491195281',
    '37.4693124776, 126.9519659471',
    '37.4731596012, 126.9531376733',
    '37.4779711884, 126.9523409651',
    '37.4803870845, 126.9547710186',
    '37.4793090834, 126.9575819623',
    '37.477970445, 126.9609692294',
    '37.4757133437, 126.9665363919',
    '37.4760902687, 126.9739335445',
    '37.4765042274, 126.9772878102',
    '37.4755677926, 126.9815605137',
    '37.475853, 126.981733',
    '37.477237, 126.98152',
    '37.4767129386, 126.9779559316',
    '37.4760302441, 126.9728531855',
    '37.4763420666, 126.9654750252',
    '37.4778159718, 126.9618154597',
    '37.4797757723, 126.9568268388',
    '37.4795353201, 126.9523195876',
    '37.4752166091, 126.9526859003',
    '37.4729379669, 126.9529331086',
    '37.4699160366, 126.9520092714',
    '37.4676372158, 126.949634803',
    '37.4701847709, 126.9445007274',
    '37.4709633892, 126.9411666565',
    '37.4710319212, 126.9372511044',
    '37.4732856825, 126.9334899868',
    '37.4762266104, 126.937316264',
    '37.4785937534, 126.9323145443',
    '37.4819179383, 126.9299495272',
    '37.4841520918, 126.92828543',
    '37.4833229548, 126.9223053005',
    '37.4826329291, 126.918578012',
    '37.4820667212, 126.915567417',
    '37.4812730274, 126.9112654643',
    '37.4806719288, 126.9079821726',
    '37.4801483679, 126.9051652284',
    '37.4786611588, 126.8948219178',
    '37.48993684, 126.8758794067',
    '37.4914025582, 126.8745580878',
    '37.4892877237, 126.8759109835',
    '37.4865890336, 126.8767921557',
    '37.4850859266, 126.8766480399',
    '37.4832394926, 126.8789081386',
    '37.4811394906, 126.8812111312',
    '37.4796160534, 126.8799035248'
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
      name: String(idx),
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
