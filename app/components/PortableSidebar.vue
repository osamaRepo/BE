<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :rail="rail"
    :temporary="smAndDown"
    :permanent="!smAndDown"
    :style="drawerStyle"
  >
    <v-card
      class="d-flex flex-column py-1"
      style="height: 100%; overflow: auto;"
    >
      <v-list density="compact" nav :class="[rail ? 'pr-0 rail-closed' : '']">
        <template v-for="item in menuItems" :key="item.value">
          <!-- Leaf item (no children) -->
          <v-tooltip
            v-if="rail && (!item.children || !item.children.length)"
            location="right"
          >
            <template #activator="{ props: tooltipProps }">
              <v-list-item
                v-bind="tooltipProps"
                :to="item.to"
                :active="isExact(item.to)"
                :class="[
                  'custom-list-item',
                  isExact(item.to) && 'active-item',
                  isExact(item.to) && 'right-border',
                ]"
                @click="handleItemClick"
              >
                <template #prepend>
                  <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                  <img v-else-if="item.imgPath" :src="item.imgPath" class="list-icon" alt="icon" />
                </template>
              </v-list-item>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>

          <v-list-item
            v-else-if="!item.children || !item.children.length"
            :title="item.title"
            :to="item.to"
            :active="isExact(item.to)"
            :class="[
              'custom-list-item',
              isExact(item.to) && 'active-item',
              isExact(item.to) && 'right-border',
            ]"
            @click="handleItemClick"
          >
            <template #prepend>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              <img v-else-if="item.imgPath" :src="item.imgPath" class="list-icon" alt="icon" />
            </template>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </v-list-item>

          <!-- Parent with children -->
          <div v-else class="group-with-line" :class="{ 'no-line': rail }">
            <v-list-group v-model="openGroups[item.value]">
              <template #activator="{ props }">
                <v-tooltip v-if="rail" location="right">
                  <template #activator="{ props: tooltipProps }">
                    <v-list-item
                      v-bind="{ ...props, ...tooltipProps }"
                      :active="isParentActive(item)"
                      @click="(e) => handleParentClick(e, item)"
                      :class="[
                        'custom-list-item',
                        isParentActive(item) && 'active-item',
                        isParentActive(item) && 'right-border',
                      ]"
                    >
                      <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                      <img v-else-if="item.imgPath" :src="item.imgPath" class="list-icon" alt="icon" />
                    </v-list-item>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
                <v-list-item
                  v-else
                  v-bind="props"
                  :title="item.title"
                  :active="isParentActive(item)"
                  @click="(e) => handleParentClick(e, item)"
                  :class="['custom-list-item']"
                >
                  <template #prepend>
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    <img v-else-if="item.imgPath" :src="item.imgPath" class="list-icon" alt="icon" />
                  </template>
                </v-list-item>
              </template>

              <!-- Children -->
              <div class="child-wrapper" :class="{ 'rail-child': rail }">
                <template v-for="child in item.children" :key="child.value">
                  <v-tooltip v-if="rail" location="right">
                    <template #activator="{ props: tooltipProps }">
                      <v-list-item
                        v-bind="tooltipProps"
                        :to="child.to"
                        :active="isExact(child.to)"
                        :class="[
                          'child-item',
                          isExact(child.to) && 'active-child',
                          isExact(child.to) && 'right-border',
                        ]"
                        @click="handleItemClick"
                      >
                        <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
                        <img v-else-if="child.imgPath" :src="child.imgPath" class="list-icon" alt="icon" />
                      </v-list-item>
                    </template>
                    <span>{{ child.title }}</span>
                  </v-tooltip>
                  <v-list-item
                    v-else
                    :title="child.title"
                    :to="child.to"
                    :active="isExact(child.to)"
                    :class="[
                      'child-item',
                      isExact(child.to) && 'active-child',
                      isExact(child.to) && 'right-border',
                    ]"
                    @click="handleItemClick"
                  >
                    <template #prepend>
                      <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
                      <img v-else-if="child.imgPath" :src="child.imgPath" class="list-icon" alt="icon" />
                    </template>
                  </v-list-item>
                </template>
              </div>
            </v-list-group>
          </div>
        </template>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { smAndDown } = useDisplay();

const props = defineProps({
  rail: Boolean,
  drawer: Boolean,
  menuItems: {
    type: Array,
    default: () => []
  },
  appBarHeight: {
    type: Number,
    default: 70
  }
});

const emit = defineEmits(["update:drawer", "update:rail"]);

const drawerModel = computed({
  get: () => props.drawer,
  set: (val) => emit("update:drawer", val),
});

const handleItemClick = () => {
  if (smAndDown.value) {
    emit("update:drawer", false);
  }
};

// Navigation helpers
const norm = (p) => (p || "").replace(/\/+$/, "") || "/";
const resolvedPath = (to) => {
  if (!to) return "";
  const r = typeof to === "string" ? router.resolve(to) : router.resolve({ ...to });
  return norm(r.path);
};
const currentPath = computed(() => norm(route.path));
const isExact = (to) => currentPath.value === resolvedPath(to);
const startsUnder = (to) => {
  const base = resolvedPath(to);
  return (
    base &&
    (currentPath.value === base || currentPath.value.startsWith(base + "/"))
  );
};
const isParentActive = (item) =>
  isExact(item.to) ||
  (item.children && item.children.some((c) => isExact(c.to))) ||
  startsUnder(item.to);

// Group management
const openGroups = reactive({});
const syncOpenGroups = () => {
  if (!props.menuItems || !Array.isArray(props.menuItems)) return;
  props.menuItems.forEach((item) => {
    if (item.children && item.value) {
      openGroups[item.value] = isParentActive(item);
    }
  });
};

const handleParentClick = (e, item) => {
  // Navigate to the parent's route if it exists
  if (item.to) router.push(item.to);

  // If the parent has children
  if (item.children?.length && item.value) {
    const currentState = openGroups[item.value];

    // Close all other open groups first
    Object.keys(openGroups).forEach((key) => {
      if (key !== item.value) {
        openGroups[key] = false;
      }
    });

    openGroups[item.value] = !currentState;
  }

  // Close drawer on mobile when parent is clicked
  if (smAndDown.value) {
    emit("update:drawer", false);
  }
};

// Watch route changes
watch(
  () => route.fullPath,
  () => {
    const activeKey = Object.keys(openGroups).find((k) => openGroups[k]);
    if (!activeKey) {
      syncOpenGroups();
    }
  },
  { immediate: true }
);

// Drawer styling
const drawerStyle = computed(() => ({
  zIndex: "1000",
  top: `${props.appBarHeight}px`,
  height: `calc(100% - ${props.appBarHeight}px)`,
}));
</script>

<style scoped>
.list-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.custom-list-item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.2s ease;
}

.custom-list-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.active-item {
  background-color: rgba(33, 150, 243, 0.12);
  color: #2196F3;
}

.right-border {
  border-right: 3px solid #2196F3;
}

.child-item {
  border-radius: 8px;
  margin: 4px 8px 4px 24px;
  transition: all 0.2s ease;
}

.child-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.active-child {
  background-color: rgba(33, 150, 243, 0.12);
  color: #2196F3;
}

.group-with-line {
  position: relative;
}

.group-with-line::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 48px;
  bottom: 8px;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.12);
}

.no-line::before {
  display: none;
}

.child-wrapper {
  padding-left: 8px;
}

.rail-child {
  padding-left: 0;
}

.rail-closed :deep(.v-list-item__prepend) {
  margin-right: 0 !important;
}
</style>
