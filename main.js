import getJSON from './getJSON.js'

const url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

const svg = d3.select('svg');
const height = svg.attr('height');
const width = svg.attr('width');

const world = svg.append('g');

svg.call(d3.zoom()
    .on('zoom',()=>{
        world.attr('transform', d3.event.transform);
    }));

getJSON(url)
    .then(data =>{
        const countries = topojson.feature(data, data.objects.countries);

        const projection = d3.geoNaturalEarth1().scale(1).fitSize([width,height],countries);

        const pathGenerator = d3.geoPath().projection(projection);
        world.append('path')
            .attr('d', pathGenerator({type:'Sphere'}))
            .attr('class','sphere');

        world.selectAll('path').data(countries.features)
        .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('class','country')
            .append('title')
                .text(d => d.properties.name);
    })

    .catch(err => console.error(err));