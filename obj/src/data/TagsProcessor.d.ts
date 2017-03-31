/**
 * Extracts from objects and processes search tags
 */
export declare class TagsProcessor {
    private static HASHTAG_REGEX;
    /**
     * Normalize a tag by replacing with REGEX: (_|#)
     *
     * @param tag The tag to normalize
     * @return A normalized tag
     */
    static normalizeTag(tag: string): string;
    /**
     * Compress a tag by replacing with REGEX: ( |_|#)
     *
     * @param tag The tag to compress
     * @return A compressed tag
     */
    static compressTag(tag: string): string;
    /**
     * Determines if two tags are equal based on length and contained characters
     *
     * @param tag1 The first tag
     * @param tag2 The second tag
     * @return True if tags are equal, false if tags are not equal
     */
    static equalTags(tag1: any, tag2: any): boolean;
    /**
     * Normalize multiple tags contained in a single String using {@link org.pipservices.runtime.data.TagProcessor#normalizeTag(String)}
     *
     * @param tags The tags to normalize
     * @return A String array of normalized tags
     */
    static normalizeTags(tags: any): string[];
    /**
     * Compress multiple tags contained in a single String using {@link org.pipservices.runtime.data.TagProcessor#compressTag(String)}
     *
     * @param tags The tags to compress
     * @return A String array of compressed tags
     */
    static compressTags(tags: any): string[];
    private static extractString(field);
    /**
     * Extracts hash tags from a JSON object based on user defined tag search fields
     *
     * @param jsonObject   The JSON object to parse
     * @param searchFields The user defined tag search fields
     * @return String array of compressed tags based on the user defined tag search fields
     */
    static extractHashTags(obj: any, ...searchFields: string[]): string[];
}
