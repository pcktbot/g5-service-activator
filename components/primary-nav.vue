<template>
  <div class="popout">
    <div class="popout__header">
      <dumpster v-bind="icon" />
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="section in sections"
        :key="section.id"
        class="p-0 list-anchor"
      >
        <b-badge
          v-if="section.disabled"
          variant="tertiary"
          class="list-anchor__badge"
        >
          Coming Soon!
        </b-badge>
        <b-btn
          :to="section.path"
          :disabled="section.disabled"
          variant="primary"
          block
          class="px-5 py-3 text-left"
        >
          <b-icon :icon="section.icon" />
          {{ section.text }}
        </b-btn>
      </b-list-group-item>
    </b-list-group>
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
      icon: {
        size: '5em',
        color: '#0b233f'
      },
      sections: [
        {
          id: 'create-client',
          text: 'Create New Client',
          path: '/new/client',
          icon: 'plus',
          disabled: false
        },
        {
          id: 'create-locations',
          text: 'Bulk Create Locations',
          path: '/new/locations',
          icon: 'building',
          disabled: false
        },
        {
          id: 'services',
          text: 'Bulk Update Services',
          path: '/update/services',
          icon: 'briefcase',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.popout {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  &__header {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
  }
}
.list-anchor {
  position: relative;
  &__badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, 25%);
    z-index: 11;
    // box-shadow: 0 2px 10px rgba(12, 34, 60, 1.00);
  }
}
</style>
