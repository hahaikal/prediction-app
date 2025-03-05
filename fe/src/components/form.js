import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormm } from '@/handler/api/useForm';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const FormHeader = ({ onSubmit }) => {

    const form = useFormm();

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
                    <Button type="submit" className="mt-4" >Save</Button>
                </form>
            </Form>
        </div>
    )
}

export function FormComponent (form) {
    return (
        <div className="grid gap-x-4 gap-y-2 grid-cols-7 my-6 text-center justify-center items-center">
            <div className='col-span-2 invisible'></div>
            <div className='col-span-2'>
                <FormField name="home" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Home Team</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Home Team"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label>Vs</Label>
            <div className='col-span-2'>
                <FormField name="away" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Away Team</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Away Team"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Handicap</Label>
            <div className='col-span-2'>
                <FormField name="handicapHome" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'> 
                <FormField name="handicapAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Odd1</Label>
            <div className='col-span-2'>
                <FormField name="oddHome1" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'> 
                <FormField name="oddAway1" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Odd2</Label>
            <div className='col-span-2'>
                <FormField name="oddHome2" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'> 
                <FormField name="oddAway2" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Score</Label>
            <div className='col-span-2'>
                <FormField name="scoreHome" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'> 
                <FormField name="scoreAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Votes</Label>
            <div className='col-span-2'>
                <FormField name="totalVotesHome" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div>
                <FormField name="totalVotesDraw" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 '> 
                <FormField name="totalVotesAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <Label className="col-span-2">Total Votes</Label>
            <div className='col-span-5'>
                <FormField name="totalVotes" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    )
}
