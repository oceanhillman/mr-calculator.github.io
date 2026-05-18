<template>
    <Teleport to="body">
        <div v-for="modal in modals" :key="modal.id" class="modal-wrapper" @click.self="cancelModal(modal.id)">
            <component
                :is="modal.component"
                v-bind="modal.props"
                @confirm="(result: any) => closeModal(modal.id, result)"
                @cancel="() => cancelModal(modal.id)"
            />
        </div>
    </Teleport>
</template>

<style src="@/assets/style/components/modals.sass"></style>

<script setup lang="ts">
const { modals, closeModal, cancelModal, registerKeyboardEvents } = useModalManager();

registerKeyboardEvents();
</script>