import {
  BaseFilter,
  Context,
  Item,
} from "https://deno.land/x/ddc_vim@v2.3.1/types.ts";

export class Filter extends BaseFilter<> {
  async filter(args: {
    context: Context,
    // completeStr: string,
    items: Item[],
  }
  ): Promise<Item[]> {
    for (const item of args.items) {
      if (args.context.filetype === 'go') {
         item.word = item.word.replace(/[\s]*?\$\{\d+?.*?\}[,]?[\s]*?/, "");
         item.word = item.word.replace(/[\s]*?\$\d+?\s*?/, "");
         item.word = item.word.replace(/\\/, "");

         if (item.word.slice(-1) === ':') {
             item.word += ' '
         }
      }
    }

    return args.items;
  }

  params(): {} { return {}; }
}
