import getJSON from './getJSON.js'

const url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const svg = d3.select('svg');
const height = svg.attr('height');
const width = svg.attr('width');

getJSON(url)
    .then(data =>{
        const countries = topojson.feature(data, data.objects.countries);
        const projection = d3.geoEqualEarth().scale(1).fitSize([width,height],countries);
        const pathGenerator = d3.geoPath().projection(projection);
        
        svg.append('path')
            .attr('d', pathGenerator({type:'Sphere'}))
            .attr('class','sphere')

        svg.selectAll('path').data(countries.features)
        .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('class','country');
    })

    .catch(err => console.error(err));