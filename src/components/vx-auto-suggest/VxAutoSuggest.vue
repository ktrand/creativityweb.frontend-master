<template>
  <div class="vx-auto-suggest">
    <div class="flex items-center relative">

      <!-- Input -->
      <vs-input
        ref="input"
        :placeholder="placeholder"
        :class="inputClassses"
        class="z-50"
        icon-pack='feather'
        icon='icon-search'
        icon-no-border
        v-model="searchQuery"
        @keyup.esc="escPressed"
        @keyup.up="increaseIndex(false)"
        @keyup.down="increaseIndex"
        @keyup.enter="suggestionSelected"
        @focus="updateInputFocus"
        @blur="updateInputFocus(false)" />
    </div>

    <!-- Group List -->
    <ul
      ref="scrollContainer"
      :class="{'hidden': !inputFocused}"
      class="auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-x-hidden"
      @mouseenter="insideSuggestions = true"
      @mouseleave="insideSuggestions = false"
      @focus="updateInputFocus"
      @blur="updateInputFocus(false)"
      tabindex="-1">

      <li
        ref="grp_list"
        v-for="(suggestion_list, grp_index) in filteredData"
        :key="grp_index"
        class="auto-suggest__suggestion-group-container">

          <!-- Suggestion List of each group -->
          <ul>
            <li
              class="auto-suggest__suggestion-group__suggestion py-3 px-4 cursor-pointer">
                  <vx-card @click="suggestion_list.video ? goTo(`video/${suggestion_list.id}`):goTo(`post/${suggestion_list.id}`)" class="video-container">
                      <div style="height:20x;width:20px">
                          <img style="height:100%" :src="$apiUrl + suggestion_list.img" alt="content-img" class="responsive card-img-top">
                      </div>
                      <h5 class="mb-1 pl-1">{{ suggestion_list.title }}</h5>
                  </vx-card>
            </li>
          </ul>
      </li>
      <li class="auto-suggest__suggestion-group__suggestion py-3 px-4 no-results" v-if="filteredData.length === 0 && searchQuery.length > 4">
        <p>Ничего не найдено.</p>
      </li>
    </ul>

  </div>
</template>

<script>
export default{
  props: {
    placeholder: {
      type: String,
      default: 'Search..'
    },
    data: {
      type: Object,
      required: true,
    },
    initalData: {
      type: Object,
      default: () => new Object
    },
    inputClassses: {
      type: [String, Object, Array],
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    showPinned: {
      type: Boolean,
      default: false
    },
    searchLimit: {
      type: Number,
      default: 4
    },
    hideGroupTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchQuery: '',
      filteredData: [],
      currentSelected: -1,
      inputFocused: false,
      insideSuggestions: false,
    }
  },
  watch: {
    // UPDATE SUGGESTIONS LIST
    searchQuery(val) {
      this.$emit('input', val)

      if(val.length > 4) {
        this.search()
      }
    },
    autoFocus(val) {
      if(val) this.focusInput()
      else this.searchQuery = ''
    },
    filteredData() {

    }
  },
  methods: {
    escPressed() {
      this.$emit('closeSearchbar')
      this.searchQuery = ''
    },

    updateInputFocus(val = true) {
      if(val) {
        if(this.searchQuery == '') this.filteredData = []
        setTimeout(() => {
          this.inputFocused = true
        }, 100)
      }
      else {
        if(this.insideSuggestions) return
        setTimeout(() => {
          this.inputFocused = false
        }, 100)
        this.escPressed()
      }
    },
    goTo(path) {
      this.filteredData = []
      this.escPressed()
      this.inputFocused = false
      this.$router.push(path)
    },
    
    search(){
      this.$vs.loading({color: 'rgb(228, 222, 37)' })
      this.$http.get(`search/${this.searchQuery}`).then(response => {
        this.filteredData = response.data.data
      }).finally(() => {
        this.$vs.loading.close()
      })
    },

    focusInput() {
      this.$refs.input.$el.querySelector('input').focus()
    }
  },
  mounted() {
    if(this.autoFocus) this.focusInput()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxAutoSuggest.scss";
</style>
