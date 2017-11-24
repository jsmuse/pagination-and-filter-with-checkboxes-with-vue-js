new Vue({
  el: '#app',
  data: {
    json: [],
    allBrands: [],
    sorted: [],
    checkedBrands: [],
    currentPage: 1,
    totalPage: 0,
    pageSize: 4,
    showUpto: 4,
    showFromto: 0,
  },
  beforeCreate() {
    fetch('https://yuliadev.com/dev/data.json').then((response) => {
      return response.json().then((json) => {
        this.json = json
        this.sorted = json
        //this.totalPage = this.json.length

        //we save all unique brands in array
        var obj = {}
        for (i = 0; i < this.json.length; i++) {
          var str = this.json[i].brand;
          obj[str] = true
        }
        this.allBrands = Object.keys(obj)
      })
    })
  },
  computed: {
    orderedList() {
      var list = this.sorted.slice(this.showFromto, this.showUpto);
      this.totalPage = Math.ceil(this.sorted.length / this.pageSize);
      return list;
    }
  },
  methods: {
    byBrand() {
      //checkbox sort by brand is here
      this.sorted = this.json.filter((elem) => {
        for (i = 0; i < this.checkedBrands.length; i++) {
          if (elem.brand === this.checkedBrands[i]) {
            return elem.brand;
          }
        }
      })
    },
    changeSelect() {
      this.showUpto = this.pageSize;
      this.currentPage = 1;
      this.showFromto = 0;
    },
    nextPage() {
      if (this.currentPage != this.totalPage) {
        this.showFromto = (this.currentPage * this.pageSize);
        this.currentPage = this.currentPage + 1;
        this.showUpto = (this.currentPage * this.pageSize);
      }
    },
    previousPage() {
      if (this.currentPage != 1) {
        this.showFromto = ((this.currentPage - 2) * this.pageSize);
        this.currentPage = this.currentPage - 1;
        this.showUpto = (this.currentPage * this.pageSize);
      }
    },
    clearFilters() {
      //clear filters and uncheck
      this.sorted = this.json
      this.checkedBrands = []
    }
  }
})
