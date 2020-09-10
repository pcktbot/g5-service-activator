<template>
  <div class="popout">
    <div class="popout__header">
      <dumpster v-bind="icon" />
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="section in sections"
        :key="section.id"
        class="p-0"
      >
        <b-btn
          :to="section.path"
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
          icon: 'plus'
        },
        {
          id: 'create-locations',
          text: 'Bulk Create Locations',
          path: '/new/locations',
          icon: 'building'
        },
        {
          id: 'services',
          text: 'Bulk Update Services',
          path: '/update/services',
          icon: 'briefcase'
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
</style>
