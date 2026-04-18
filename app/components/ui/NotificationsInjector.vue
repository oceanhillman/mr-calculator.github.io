<template>
    <Teleport to="body">
        <div class="notifications-wrapper">
            <UiNotification
                v-for="notification in notifications"
                :icon="notification.icon"
                :message="notification.message"
                @close="close(notification.id)"
            />
        </div>
    </Teleport>
</template>

<script setup lang="ts">
const { notifications, close } = useNotificationManager();
</script>