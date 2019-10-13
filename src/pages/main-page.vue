<template>
  <div class="main-page">
    <app-header>
      <app-centered>
        <h1 class="main-page__heading">
          Генератор словосочетаний
        </h1>
      </app-centered>
    </app-header>
    <app-page-content>
      <app-centered>
        <div class="generator">
          <button
            class="generator__button"
            @click="generateNewPhrase"
          >
            Сгенерировать новое словосочетание
          </button>

          <div class="generator__wrapper">
            <label
              class="generator__phrase-input-label"
              @click="copyToBuffer"
              v-show="newPhrase"
            >
              <input
                class="generator__phrase-input"
                type="text"
                ref="phraseInput"
                v-model="newPhrase"
              >
              <span class="generator__succesful-icon">
                <svg
                  :class="{ 'animate': isPhraseCopied }"
                  viewbox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z"
                    stroke="#3da35a"
                    fill="transparent"
                  />
                </svg>
              </span>
            </label>

            <div class="generator__note">
              Кликните чтобы скопировать в буфер обмена
            </div>
          </div>
        </div>
      </app-centered>
    </app-page-content>
  </div>
</template>

<script>
  import { SCIENTISTS } from '../data/scientists'
  import { ADJECTIVES } from '../data/adjectives'

  import AppHeader from '../components/app-header'
  import AppPageContent from '../components/app-page-content'
  import AppCentered from '../components/app-centered'

  export default {
    name: 'main-page',

    components: {
      AppHeader,
      AppPageContent,
      AppCentered
    },

    data () {
      return {
        newPhrase: '',

        isPhraseCopied: false
      }
    },

    computed: {
      adjectives () {
        return ADJECTIVES
      },

      scientists () {
        return SCIENTISTS
      },

      numberOfAdjectives () {
        return ADJECTIVES.length
      },

      numberOfScientist () {
        return SCIENTISTS.length
      }
    },

    methods: {
      randomInteger (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      },

      generateNewPhrase () {
        this.isPhraseCopied = false
        const randomAdjectiveIndex = this.randomInteger(0, this.numberOfAdjectives - 1)
        const randomScientistIndex = this.randomInteger(0, this.numberOfScientist - 1)
        this.newPhrase = `${this.adjectives[randomAdjectiveIndex]} ${this.scientists[randomScientistIndex]}`
      },

      copyToBuffer () {
        this.$refs.phraseInput.select()
        document.execCommand('copy')
        this.isPhraseCopied = true
        setTimeout(() => {
          this.isPhraseCopied = false
        }, 1300)
      }
    }
  }
</script>

<style lang="scss">
  .main-page {

    &__heading {
      margin: 0;
      text-align: center;
    }
  }

  .generator {
    min-width: 320px;
    max-width: 520px;
    margin: 0 auto;
    text-align: center;

    &__button {
      padding: 20px;
      font-size: 20px;
      line-height: 26px;
      color: white;
      background: linear-gradient(to top right, #41b782, #86d169);
      border: none;
      border-radius: 300px;
      transition: .2s;
      outline: none;
      transform: scale(1);

      &:hover {
        background: linear-gradient(to bottom right, #41b782, #86d169);
        box-shadow: 0 25px 55px rgba(0,0,0,.2), 0 16px 28px rgba(0,0,0,.24);
        transform: scale(1.01);
        cursor: pointer;
      }
    }

    &__wrapper {
      position: relative;
      margin: 60px 0 0 0;
    }

    &__phrase-input-label {
      display: block;

      &:hover {

        & ~ .generator__note {
          opacity: 1;
        }
      }
    }

    &__phrase-input {
      display: block;
      width: 100%;
      padding: 0 44px;
      font-size: 32px;
      line-height: 44px;
      text-align: center;
      border: none;
      background-color: transparent;
      outline: none;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
      }
    }

    &__note {
      display: block;
      position: absolute;
      top: 160%;
      left: 50%;
      width: 100%;
      padding: 20px;
      font-size: 16px;
      line-height: 20px;
      opacity: 0;
      transform: translateX(-50%);
      box-shadow: 0 25px 55px rgba(0,0,0,.2), 0 16px 28px rgba(0,0,0,.24);
      border-radius: 20px;
      transition: 0.2s;

      &::after {
        content: "";
        position: absolute;
        top: -10px;
        left: calc(50% - 10px);
        width: 20px;
        height: 20px;
        background-color: white;
        transform: rotate(45deg);
      }
    }

    &__succesful-icon {
      position: absolute;
      display: block;
      top: -4px;
      right: 0;
      width: 44px;
      height: 44px;

      svg {
        width: 100%;
        height: 100%;
      }

      path {
        stroke-dasharray: 99.47578430175781;
        stroke-dashoffset: -99.47578430175781;
        fill: transparent;
      }

      svg.animate path {
        animation: 1.2s ease forwards draw;
        opacity:1;
      }
    }
  }

  @keyframes draw {
    0% {
      opacity: 1;
      stroke-dashoffset: -99.47578430175781;
      fill: transparent;
      transform: translateY(0);
    }

    35% {
      stroke-dashoffset: 0;
      fill: transparent;
    }

    60% {
      fill: #3da35a;
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      fill: #3da35a;
      stroke-dashoffset: 0;
      opacity: 0;
      transform: translateY(-10px);
    }
  }
</style>
