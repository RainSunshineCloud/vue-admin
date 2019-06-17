<template>
    <div style="text-align:center">
        <Form ref="data" :model="data" :label-width="80">
            <template v-for="val in formFields">
                <FormItem :label="val.title">
                    <template v-if="val.type == 'select'">
                        <Select v-model="data[val.key]">
                            <Option v-for="(val,key) in val.fields" :value='key' :key="key">{{val}}</Option>
                        </Select>
                    </template>
                    <template v-else>
                        <Input :type="val.type" :readonly="val.readonly" v-model="data[val.key]"></Input>
                    </template>
                </FormItem>
            </template>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'modify',
        props : {
            data:{
                type: Object,
            },
            formFields: {
                type:Array,
                default () {
                    return [
                    ];
                }
            },
        }
    }
</script>