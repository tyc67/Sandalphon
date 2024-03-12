export default {}

/**
 * @typedef {'published' | 'draft' | 'scheduled' | 'archived' | 'invisible'} PostState
 */

/**
 * @typedef {Object} SectionWithCategory
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {boolean} isMemberOnly
 */

/**
 * @typedef {Object} Section
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {"active" | "inactive"} state
 * @property {SectionWithCategory[]} categories
 */
/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {boolean} isMemberOnly
 * @property {"active" | "inactive"} state
 * @property {Section[]} sections it's singular but wrongly named as plural
 */

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Tag
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 */

/**
 * @typedef {Object} ImageFile
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} Resized
 * @property {string} original
 * @property {string} w480
 * @property {string} w800
 * @property {string} w1200
 * @property {string} w1600
 * @property {string} w2400
 */

/**
 * @typedef {Object} HeroImage
 * @property {string} id
 * @property {string} name
 * @property {ImageFile} imageFile
 * @property {Resized} resized
 * @property {Resized} resizedWebp
 */

/**
 * @typedef {Object} SlideshowImage
 * @property {string} id
 * @property {Resized} resized
 * @property {Resized} resizedWebp
 * @property {string} name
 * @property {string} topicKeywords
 */

/**
 * @typedef {Object} HeroVideo - certain video information
 * @property {string} id - unique id
 * @property {string} videoSrc - video url
 * @property {Pick<HeroImage, 'id' | 'resized'> & Pick<HeroImage['resized'], 'original'>} heroImage - video url
 */

/**
 * @typedef {import('~/type/wide-article/draft').Draft} Draft
 */

/**
 * @typedef {Object} Related
 * @property {string} id - unique id
 * @property {string} slug - post slug
 * @property {string} title - post title
 * @property {HeroImage} heroImage - hero image of the post
 */

/**
 * @typedef {Object} manualOrderOfSlideshowImage
 * @property {string} id
 * @property {string} name
 *
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {import('~/type/wide-article/draft').Draft} brief
 * @property {HeroImage} heroImage
 * @property {string} heroUrl
 * @property {number} sortOrder
 * @property {string} createdAt
 * @property {string} leading
 * @property {string} type
 * @property {string} style
 * @property {number} postsCount
 * @property {number} featuredPostsCount
 * @property {Post[]} posts
 * @property {Tag[]} tags
 * @property {string} og_description
 * @property {HeroImage} og_image
 * @property {SlideshowImage[]} slideshow_images
 * @property {manualOrderOfSlideshowImage[]} manualOrderOfSlideshowImages
 * @property {string} dfp
 */

/**
 * @typedef {Object} Post
 * @property {string} id - unique id of post
 * @property {string} slug - post slug
 * @property {string} title - post title
 * @property {string} subtitle - post subtitle
 * @property {string} publishedDate - post published date
 * @property {string} updatedAt - post updated date
 * @property {PostState} state - post state, different states will have different post access of viewing
 * @property {'article'| 'wide' | 'projects' | 'photography' | 'script' | 'campaign' | 'readr'} style - what kind of article style is
 * @property {boolean} isMember - whether this post is a member article
 * @property {boolean} isAdult - whether this post only adults can read
 * @property {Section[] | null } sections - which sections does this post belong to
 * @property {Section[] | null} sectionsInInputOrder - sections with adjusted order
 * @property {Category[] } categories - which categories does this post belong to
 * @property {Category[] | null} categoriesInInputOrder - categories with adjusted order
 * @property {Contact[] | null} writers -  the field called '作者' in cms
 * @property {Contact[] | null} writersInInputOrder - writers with adjusted order
 * @property {Contact[] } photographers - the field called '攝影' in cms
 * @property {Contact[] } camera_man - the field called '影音' in cms
 * @property {Contact[] } designers - the field called '設計' in cms
 * @property {Contact[] } engineers - the field called '工程' in cms
 * @property {Contact[] } vocals - the field called '主播' in cms
 * @property {string} extend_byline - the field called '作者(其他)' in cms
 * @property {Tag[] } tags - tags of the post
 * @property {HeroVideo | null} heroVideo - hero video of the post
 * @property {HeroImage | null} heroImage - hero image of the post
 * @property {string} heroCaption - caption to explain hero video or image
 * @property {Draft} brief - post brief
 * @property {Draft} content - post content
 * @property {Draft} trimmedContent - post trimmed content
 * @property {Related[] } relateds related articles selected by cms users
 * @property {Related[] } relatedsInInputOrder related articles with adjusted order
 * @property {boolean} isFeatured
 * @property {Tag[]} tags
 * @property {string} redirect - post redirect slug or external url
 * @property {HeroImage | null} og_image - og image of the post
 * @property {string} og_description - og description of the post
 * @property {boolean} hiddenAdvertised - decide whether to display advertisements
 * @property {boolean} isAdvertised - the field called '廣告文案' in cms
 * @property {Topic | null} topics - which topic is belong to
 */

/**
 * @typedef {Object} AsideListingPost
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {Section[]} sections
 * @property {Section[]} sectionsInInputOrder
 * @property {HeroImage | null} heroImage
 */

/**
 * @typedef {'article'| 'wide' | 'projects' | 'photography' | 'script' | 'campaign' | 'readr'} ArticleStyle
 */
