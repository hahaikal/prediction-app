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

export const FormHeader = ({ onSubmit, match = {} }) => {
    const form = useFormm();

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='p-6'>
                    <FormField name="league" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>League</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="League" value={match.league} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField name="date" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Date" type="date" className="w-50" value={match.date} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormComponent form={form} match={match} />
                    <Button type="submit" className="mt-4">Save</Button>
                </form>
            </Form>
    )
}

export function FormComponent({ form, match = {}}) {
    return (
        <div className="grid gap-x-4 gap-y-2 grid-cols-7 my-6 text-center justify-center items-center">
            <div className='col-span-2 invisible'></div>
            <div className='col-span-2'>
                <FormField name="home" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Home Team</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Home Team" value={match.home} />
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
                            <Input {...field} placeholder="Away Team" value={match.away} />
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
                            <Input {...field} step="0.01" value={match.handicapHome} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'>
                <FormField name="handicapAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01" value={match.handicapAway} />
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
                            <Input {...field} step="0.01" value={match.oddHome1} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'>
                <FormField name="oddAway1" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01" value={match.oddAway1} />
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
                            <Input {...field} step="0.01" value={match.oddHome2} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'>
                <FormField name="oddAway2" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} step="0.01" value={match.oddAway2} />
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
                            <Input {...field} value={match.scoreHome} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 col-end-8'>
                <FormField name="scoreAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} value={match.scoreAway} />
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
                            <Input {...field} value={match.totalVotesHome} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div>
                <FormField name="totalVotesDraw" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} value={match.totalVotesDraw} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <div className='col-span-2 '>
                <FormField name="totalVotesAway" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} value={match.totalVotesAway} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            {match.home ? '' : (
                <>
                    <Label className="col-span-2">Total Votes</Label>
                    <div className='col-span-5'>
                        <FormField name="totalVotes" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} value={match.totalVotes} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </>
            )}
        </div>
    )
}
