import faker from 'faker'
import niceColors from 'nice-color-palettes'
import _ from 'lodash'

faker.seed(1);

const colors = [
  ...niceColors[1].slice(1, niceColors.length),
  ...niceColors[55].slice(0, 3)
]


export const detailsIcons = [
  { colors: "#9fd7f1", icon: "isv" },
  { colors: "#f3b000", icon: "trophy" },
  { colors: "#f2988f", icon: "edit" },
];

const salonData = _.times(20, (n) => {
  return {
    key: n,
    color: colors[n % colors.length],
    image: faker.image.avatar(),
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    categories: [...Array(3).keys()].map((value,index) => {
      return {
        key: index,
        title: faker.name.jobType(),
        subcats: [...Array(3).keys()].map(() => faker.name.jobTitle())
      }
    })
  }
})

export default salonData;


