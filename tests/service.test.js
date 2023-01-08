import userService from '../services/user.service.js';
import categoryService from '../services/category.service.js';
import { faker } from '@faker-js/faker';
import coursesService from '../services/courses.service.js';

(async () => {
  const web1 = await coursesService.insert(
    'Become a Certified HTML, CSS, JavaScript Web Developer',
    '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
    '',
    'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications',
    'Completely Updated for 2023/2024 with 40 NEW lectures coding activities and projects! \n' +
      '\n' +
      'Learn What It Takes to Code Dynamic, Professional Websites and Web Apps From The Comfort of Your Own Home \n' +
      '\n' +
      'Do you ever browse the internet wondering how your favorite websites were built? Facebook, Twitter, Amazon—they were all created by people who at one point in time didn’t know anything about coding. How did they obtain this knowledge? \n' +
      '\n' +
      'In this comprehensive course, I’m going to show you everything you need to know so that you can follow in these people’s footsteps. \n' +
      '\n' +
      'You’re going to learn how to code AND you’re going to become a certified professional from a recognized international trainer. And best of all, you’re going to have fun doing it. \n' +
      '\n' +
      'You Don’t Have to Be a Genius or a Mathematical Wizard. \n' +
      '\n' +
      'So many people believe that you must have a special ‘gift’ to create professional-quality, dynamic websites/web apps. I’m here to tell you once and for all that this is false. All you need to have is the desire to learn and the ability to follow instructions—that’s it! \n' +
      '\n' +
      'Our course starts teaching basic coding principles and develops your coding skills in a variety of languages from beginner through to advanced. Here it is, once and for all, a complete guide that will take you from novice to web developer. \n' +
      '\n' +
      'Skip Hours of Frustration and Thousands of Wasted Dollars and Become 100% Certified \n' +
      '\n' +
      'The internet has changed the rules of doing business. More and more companies are migrating online while many new, never before seen businesses are created every day thanks to the power of this phenomenon. You know what that means? Higher demand for people just like you! \n' +
      '\n' +
      'But the problem for these businesses is that while demand is high, supply is short. \n' +
      '\n' +
      'Please don’t let a lack of knowledge stop you from having the career of your dreams, not when the knowledge you need is right here and is extremely affordable. \n' +
      '\n' +
      'Don’t worry, you won’t need to buy any additional courses, it’s all here. No need to spend four years and over $15,000 per year in college tuition either—it really is all here. From HTML to CSS then to Javascript and finally PHP, you will learn how to Become a Certified Web Developer. \n' +
      '\n' +
      'It Doesn’t Matter Where You’re Starting From...You Can Do It! \n' +
      '\n' +
      'Maybe: \n' +
      '\n' +
      '     ● You’re planning on studying coding at college and want to build a rock-solid foundation so that you have a huge head start before your course begins? \n' +
      '\n' +
      '     ● You’re dissatisfied with your current job and want to learn exactly what it takes to become a fully qualified web developer? \n' +
      '\n' +
      '     ● You’re currently working in IT but want to expand your skill base so that you’re 100% up to date with the latest developments in web technology? \n' +
      '\n' +
      '     ● You want to develop mobile apps or websites on the side to create some additional income while retaining your current job? ',
    1899000,
    0,
    0,
    'd172436b-5020-4b34-8827-6ebd041d5474'
  );
  const web2 = await coursesService.insert(
    'The Complete 2020 Fullstack Web Developer Course',
    '2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2',
    '',
    'Learn javascript online and supercharge your web design with this Javascript for beginners training course.',
    "You're probably on this page because you want to learn web development. Not just one little piece, but ALL of it. \n" +
      '\n' +
      'Or maybe you’re coding already but you want to make BETTER websites?\n' +
      '\n' +
      'I was in your shoes once and THIS is the course I WISH I HAD. \n' +
      '\n' +
      'Welcome to The Complete Fullstack Web Developer Course\n' +
      '\n' +
      'This was the first "Complete Web Development" course on Udemy. It\'s extremely comprehensive and I explain EVERYTHING you need to know, step by step. There\'s a reason why there are so many "Complete Web Development" courses on Udemy today -- they took what worked and made spin off courses.\n' +
      '\n' +
      'Join over 80,000 other students in this massive course! \n' +
      '\n' +
      "This course is designed for every skill level. Whether you're just learning web development today, or you're already a Python Pro, there's lots to learn for everybody! \n" +
      '\n' +
      'Design, develop and launch several websites!\n' +
      '\n' +
      "You will develop several projects, a portfolio page for free on GitHub, and lastly an entire website. And I'll teach you how to deploy all of it.\n" +
      '\n' +
      'Skip to the part you want to learn\n' +
      '\n' +
      "This course was designed for you to either watch in order, or to skip around section-by-section. Maybe you already know JavaScript and don't want to watch it — that's OK! Skip to the next section on APIs, or work on the projects that come after it.",
    2199000,
    0,
    0,
    'd172436b-5020-4b34-8827-6ebd041d5474'
  );
  const mobile = await coursesService.insert(
    'Xamarin Forms: Build Native Cross-platform Apps with C#',
    'd0336f15-32dd-4146-a814-0c035a769430',
    '',
    'Learn to build native mobile apps for Android, iOS and Windows using your existing C# skills',
    "With over 13,000 happy students and 2,600+ positive reviews, this course is Udemy's most popular course for learning Xamarin Forms! \n" +
      '\n' +
      '\n' +
      '\n' +
      'Do you have an idea for an app and want to turn that into reality? Well, if you want to build that app for iOS, you need to know Objective-C, which is an old, C-based language. The alternative is to learn Swift. If you want to build the same app for Android, you need to learn Java. And if you want to build this app for Windows, of course you need to know C#.\n' +
      '\n' +
      "Sounds like a lot of headache. It's not just about learning different programming languages. It's about the fact that each platform has its own UI framework which is built with a different architecture and API. \n" +
      '\n' +
      '\n' +
      '\n' +
      "Building apps shouldn't be that painful. Is there a better way? Yes there is: Xamarin Forms.\n" +
      '\n' +
      "Xamarin Forms is a UI framework for building native cross-platform mobile apps with C#. You code your app only once, and let Xamarin compiler build your app for each platform. As simple as that! You don't need to learn 4 different languages and presentation frameworks! \n" +
      '\n' +
      '\n' +
      '\n' +
      'In this course, Mosh, author of 9 five-star courses on Udemy, will take you on a pragmatic and step-by-step journey and teach you how to build native mobile apps for Android, iOS and Windows using Xamarin Forms and C#. ',
    1699000,
    0,
    0,
    'd172436b-5020-4b34-8827-6ebd041d5474'
  );
  const mobile2 = await coursesService.insert(
    'Android Java Masterclass - Become an App Developer',
    'd0336f15-32dd-4146-a814-0c035a769430',
    '',
    'Improve your career options by learning Android app Development. Master Android Studio and build your first app today',
    'There’s no getting around it.\n' +
      '\n' +
      'Android accounts for 81.7% of all smartphones sold, but not all come packed with the very latest Android Nougat.\n' +
      '\n' +
      'That won’t worry you because after completing this course, the apps you build will perform brilliantly on Android Nougat or any older Android operating system.\n' +
      '\n' +
      'Now that’s something most courses don’t teach you!\n' +
      '\n' +
      'So, you want to be an Android 7 Nougat programmer?  Or you are interested in Android 8 Oreo?\n' +
      '\n' +
      'Well, I’m Tim Buchalka, one of your instructors, and I’ve designed the Android 7 Nougat App and Android 8 Orea Masterclass just for you!  Yes one, course covering both version!\n' +
      '\n' +
      'Choosing a course that’s perfect for you can be damn hard. You need Instructors:\n' +
      '\n' +
      '·      Who are passionate about what they do.\n' +
      '\n' +
      '·      Keep their courses continually updated.\n' +
      '\n' +
      '·      And most important, provide outstanding support and follow up to your questions.\n' +
      '\n' +
      'That’s what I do. And that’s the reason why I made it into the Top 10 List of Outstanding Instructors in the 2015 Udemy Instructor Awards.\n' +
      '\n' +
      'Know that you’re exactly in the right place to MASTER Android 7 Nougat app programming as well as Android 8 Oreo!\n' +
      '\n' +
      'Yes, we are in the process right now of updating the entire course to Android Oreo now it has been released by Google!\n' +
      '\n' +
      'In this course, you will discover the power of Android app development, and obtain the skills to dramatically increase your career prospects as a software developer. You’ll also have a head start over other developers using obsolete tools and earlier versions of Android.\n' +
      '\n' +
      "Android is continually being updated, so OLD versions of the operating systems will have features from the latest version. It's called AppCompat, which is a set of support libraries used to make apps developed with newer versions, work with older versions.\n" +
      '\n' +
      'But it only works if the developer codes it a right way. It doesn’t just happen by default. The way I teach you in this Masterclass course is the right way!\n' +
      '\n' +
      'With my course, you get the best of both worlds. You’re taught to write code for the latest version of Android Nougat with a strong focus on AppCompat. That way, the apps you build will also support older versions of Android.\n' +
      '\n' +
      'Most Android courses just focus on teaching app development for the current Nougat version. What that means is you’re only taught to make apps for the latest version of Android, and that alienates a huge user base.\n' +
      '\n' +
      'With my course, that’s not the case. Your skill level is maximized so your app reaches more users, which means more downloads, which means more money.\n' +
      '\n' +
      'Starting is easy because no previous programming experience is needed. NONE! If you do have it, great. Or maybe you just want to brush up on your Android development skills, and that’s fantastic too.\n' +
      '\n' +
      'The course is presented using a combination of video, slides and diagrams, all designed to teach you everything you need to know.',
    1899000,
    0,
    0,
    'd172436b-5020-4b34-8827-6ebd041d5474'
  );
})();
