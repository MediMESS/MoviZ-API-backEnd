const data = [
  {
      title:'abcd',
      titleType: 'a',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd2',
      titleType: 'a',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd3',
      titleType: 'a',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd1',
      titleType: 'b',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd2',
      titleType: 'b',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd3',
      titleType: 'b',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd4',
      titleType: 'b',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd1',
      titleType: 'c',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
  {
      title:'abcd2',
      titleType: 'c',
      imgUrl: 'tMtc',
      rating: 5,
      year: 2019,
      actor: 'sam, bam,fam',
      count: 5030,
      cast: 'mariah, candrine#'
  },
];

test = data.filter(d => {return d.titleType==='b'})
			.map(d2 => {
            return {title: d2.title, imgUrl: d2.imgUrl, rating: d2.rating, year:d2.year}
          })
