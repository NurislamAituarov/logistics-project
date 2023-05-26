<template>
  <v-dialog v-model="dialog" persistent width="800">
    <v-card>
      <v-card-title>
        <span class="text-h5">Изменить данные строки</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="itemEdit.name"
                label="Наименование еденицы*"
                variant="solo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="itemEdit.product"
                label="Название товара*"
                variant="solo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="itemEdit.newCol"
                label="Новая колонка*"
                variant="solo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="itemEdit.price"
                :rules="[rules.required, rules.number]"
                label="Цена*"
                prefix="$"
                variant="solo"
                required
                hint="Цена груза"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="itemEdit.quantity"
                :rules="[rules.required, rules.number]"
                label="Кол-во*"
                maxlength="5"
                variant="solo"
                hint="Количество груза"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialogsWindow">
          Закрыть
        </v-btn>
        <v-btn
          color="blue-darken-1"
          :disabled="!itemEdit.price || !itemEdit.quantity"
          variant="text"
          @click="saveLineEdit"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TheDialogsWindow",

  props: {
    dialogActive: { type: Boolean, default: false },
  },

  data: () => ({
    dialog: false,
    itemEdit: {},
    rules: {
      required: (value) => !!value || "Поле, обязательное для заполнения",
      number: (v) =>
        /^\d+$/.test(v) || "Поле должно содержать числовое значение",
    },
  }),

  computed: {
    ...mapGetters(["getEditLine"]),
  },

  watch: {
    dialogActive(value) {
      this.dialog = value;
      if (value) this.itemEdit = { ...this.getEditLine };
    },

    getEditLine(item) {
      this.itemEdit = { ...item };
    },
  },

  methods: {
    ...mapActions(["setSaveLineEdit"]),

    closeDialogsWindow() {
      this.dialog = false;
      this.$emit("close-dialog-window");
      this.itemEdit = {};
    },

    saveLineEdit() {
      this.dialog = false;
      this.setSaveLineEdit({ data: this.itemEdit, id: this.itemEdit.id });
      this.$emit("close-dialog-window", "save");
    },
  },
};
</script>