import FormComponent from "@/components/form";
import { useFormm } from '@/handler/api/useForm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function FormPrediksi () {
    const form = useFormm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="col-span-2 border mt-10 shadow-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='p-6'>
                    <FormField name="league" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>League</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="League" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField name="date" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Date" type="date" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormComponent form={form} />
                    <Button type="submit" className="mt-4">Save</Button>
                </form>
            </Form>
        </div>
    )
}