const distanceContainer = document.querySelector('.distance');
const geo = navigator.geolocation;
const points = [
  { name: 'test', lat: 48.30574058361596, lon: -324.8602208588273 },
  { name: 'test1', lat: 48.4016128, lon: 35.14368 },
  { name: 'Liesenstraße 3, Berlin', lat: 52.537736, lon: 13.37534 },
  { name: 'Platz des 18. Berlin', lat: 52.516288, lon: 13.37723 },
  { name: '6 Av. Gustave Eiffel, Paris', lat: 48.857869, lon: 2.295224 },
  { name: 'al. Jana Pawła II 61 Warsaw', lat: 52.248544, lon: 20.987652 },
  { name: 'Siewierska 10, Warsaw', lat: 52.213317, lon: 20.975865 },
  { name: 'Mirów, Warsaw', lat: 52.230382, lon: 20.984272 },
  { name: 'Palace of Culture and Science, Warsaw', lat: 52.23226, lon: 21.007737 },
  { name: 'Przejazd Warsaw, 5', lat: 52.193467, lon: 20.988075 },
  { name: 'Danil', lat: 50.3818202, lon: 30.4762373 },
];

const calculateDistance = (point1, point2) => {
  const { lat: lat1, lon: lon1 } = point1;
  const { lat: lat2, lon: lon2 } = point2;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
};

const getMin = arr => {
  return [...arr].sort((a, b) => a.distance - b.distance)[0];
};

const onSuccess = data => {
  const lat1 = data.coords.latitude;
  const lon1 = data.coords.longitude;
  const point1 = { lat: lat1, lon: lon1 };

  const distances = points.map(point => ({
    name: point.name,
    distance: calculateDistance(point1, point).toFixed(0),
  }));

  const closest = getMin(distances);
  console.log(closest);

  distanceContainer.innerHTML = `${closest.distance} (${closest.name})`;
};
const onError = data => console.log(data);

geo.watchPosition(onSuccess, onError);
