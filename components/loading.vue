<template>
  <div v-if="loading" class="centered">
    <div class="fire">
      <div class="flames">
        <div class="flame" />
        <div class="flame" />
        <div class="flame" />
        <div class="flame" />
      </div>
    </div>
    <dumpster v-bind="icon" />
  </div>
</template>

<script>
import Dumpster from '~/components/icons/dumpster'
export default {
  components: {
    Dumpster
  },
  data() {
    return {
      loading: false,
      icon: {
        size: '10em',
        color: '#ee4f3d'
      }
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.centered {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}
// https://codepen.io/z-/pen/JXVpgp
$yellow: #FFDC01;
$orange: #FDAC01;
$red: #F73B01;
$animationtime: 1.5s;

.fire {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  height: 5vw;
  width: 5vw;
  .flames {
    position: absolute;
    bottom: 40%;
    left: 50%;
    width: 60%;
    height: 60%;
    transform: translateX(-50%)rotate(45deg);
    .flame {
      position: absolute;
      right: 0%;
      bottom: 0%;
      width: 0%;
      height: 0%;
      background-color: $yellow;
      border-radius: 1vw;
      &:nth-child(2n + 1) {
        animation: flameodd $animationtime ease-in infinite;
      }
      &:nth-child(2n) {
        animation: flameeven $animationtime ease-in infinite;
      }
      &:nth-child(1) {
        animation-delay:0s;
      }
      &:nth-child(2) {
        animation-delay: $animationtime / 4;
      }
      &:nth-child(3) {
        animation-delay: $animationtime / 4 * 2;
      }
      &:nth-child(4) {
        animation-delay: $animationtime / 4 * 3;
      }
    }
  }
}

@keyframes flameodd {
  0%,
  100% {
    width: 0%;
    height: 0%;
  }
  25% {
    width: 100%;
    height: 100%;
  }
  0% {
    background-color: $yellow;
    z-index: 10;
  }
  40% {
    background-color: $orange;
    z-index: 10;
  }
  100% {
    background-color: $red;
    z-index: -10;
  }
  0% {
    right: 0%;
    bottom: 0%;
  }
  25% {
    right: 1%;
    bottom: 2%;
  }
  100% {
    right: 150%;
    bottom: 170%;
  }
}

@keyframes flameeven {
  0%,
  100% {
    width: 0%;
    height: 0%;
  }
  25% {
    width: 100%;
    height: 100%;
  }
  0% {
    background-color: $yellow;
    z-index: 10;
  }
  40% {
    background-color: $orange;
    z-index: 10;
  }
  100% {
    background-color: $red;
    z-index: -10;
  }
  0% {
    right: 0%;
    bottom: 0%;
  }
  25% {
    right: 2%;
    bottom: 1%;
  }
  100% {
    right:170%;
    bottom:150%;
  }
}
</style>
