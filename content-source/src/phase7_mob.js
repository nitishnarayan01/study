// Phase 7: From Code to Live. Mobile journey (ml01-ml09).
addTopic({id:"ml01",cat:MOB7,t:"The mobile journey: from first line of code to the app stores",d:"Understand",p:"P0",n:"New",h:1.5,
what:"The stages a mobile app goes through from setup to being live in the Apple App Store and Google Play: setup, code, test, build and sign, beta test, store listing, review, staged rollout and monitoring, and how this differs from the web.",
why:"Mobile releases have gates the web doesn't: signing, store review and users who update slowly. Managers often test whether you understand these differences.",
concepts:["Native vs cross-platform recap","The mobile delivery stages","Store review as a release gate","Why rollback is different on mobile","Release cadence and release trains","Backend compatibility with older app versions"],
learn:["appReview","playTesting","testflight"],
doIt:"For an app you use daily, check its version history in the store. How often does it release?",
prove:"A one-page map of your team's mobile release process with owners and typical durations.",
interview:"How is releasing a mobile app different from releasing a website?",
covers:["Mobile delivery lifecycle","App store release"]},
{sections:[
 {h:"The journey at a glance",flowLabel:"From code to a phone near you",flow:[["Build it",[["Set up","Xcode, Android Studio, accounts"],["Code","screens, APIs, device features"],["Test","unit, UI, real devices"]]],["Package it",[["Build and sign","release build with certificates"],["Beta","TestFlight, Play testing tracks"]]],["Ship it",[["Store listing","text, screenshots, privacy"],["Review","Apple and Google check the app"],["Rollout","phased or staged release"],["Monitor","crashes, ratings, analytics"]]]]},
 {h:"Web vs mobile release",table:[["Topic","Web","Mobile"],["Who approves","Your team","Your team plus Apple or Google review"],["Time to users","Minutes after deploy","Hours to days (review, then users update)"],["Rollback","Redeploy old version","No true rollback; release a new version or halt rollout"],["Versions in use","One (latest)","Many: users stay on old versions"],["Signing","Not needed","Builds must be signed with your certificates"],["Testing","Browsers","Many devices, screen sizes and OS versions"]]},
 {h:"Consequences for planning",bullets:["Plan release dates with buffer for store review.","Keep the backend compatible with older app versions still in use.","Use feature flags or remote config to switch features without a new release.","Agree a minimum supported app version and a forced-update approach for critical fixes.","Many teams run a fixed release train, for example every two weeks."]},
 {h:"Key terms",gloss:[["App Store / Google Play","Apple's and Google's app marketplaces"],["App Store Connect","Apple's portal for managing apps and releases"],["Google Play Console","Google's portal for managing apps and releases"],["Store review","Platform check before an app or update goes live"],["Release train","Fixed release schedule"],["Remote config","Settings fetched by the app at runtime to change behaviour without a release"]]}
],
quiz:[["Why is rollback different on mobile?","Users who installed a version keep it; you can only halt the rollout or ship a new version."],["What extra gate does a mobile release have?","Store review by Apple or Google."],["Why keep APIs compatible with old app versions?","Many users don't update straight away."],["Name Apple's and Google's release portals.","App Store Connect and Google Play Console."]],
deeper:["appReview","playTesting","testflight"]},
{prac:["Add store review time to every mobile release plan; never promise a same-day mobile fix.","Track the share of users on each app version to decide when old versions can be retired."],
 mis:[["Mobile apps update for everyone instantly.","Updates roll out over days and many users delay updating."],["A web fix is enough for an app bug.","Only if the bug is in the backend; app code needs a new release."]]});

addTopic({id:"ml02",cat:MOB7,t:"Mobile project setup: tools, accounts and identifiers",d:"Understand",p:"P0",n:"New",h:1,
what:"What a mobile team sets up before coding: Xcode and Android Studio, SDKs, simulators and emulators, the Apple Developer Program and Google Play Console accounts, bundle IDs and application IDs, dependency managers, and build flavours for different environments.",
why:"Account access and identifiers are frequent blockers, especially in large companies where developer accounts belong to the organisation. Knowing them helps you remove delays early.",
concepts:["Xcode and Android Studio","SDKs and minimum OS versions","Simulators, emulators and real devices","Apple Developer Program and Play Console accounts","Bundle ID and application ID","Dependency managers (CocoaPods, Swift Package Manager, Gradle)","Build flavours and schemes per environment"],
learn:["androidArch","flutterArch","rnArch"],
doIt:"Find out who owns your company's Apple Developer and Google Play accounts and who has admin access.",
prove:"A mobile setup checklist: accounts, roles, identifiers, environments and the minimum OS versions supported.",
interview:"We're starting a new app next month. What needs to be ready before developers can start?",
covers:["Mobile tooling","Developer accounts","App identifiers"]},
{sections:[
 {h:"What needs to exist",table:[["Item","iOS","Android"],["IDE (development tool)","Xcode (needs a Mac)","Android Studio"],["Language","Swift (older: Objective-C)","Kotlin (older: Java)"],["Cross-platform option","Flutter (Dart), React Native (JavaScript)","Same"],["Store account","Apple Developer Program (paid yearly)","Google Play Console (one-time fee)"],["App identifier","Bundle ID, for example com.company.app","Application ID, same style"],["Dependencies","Swift Package Manager or CocoaPods","Gradle"],["Test devices","Simulator plus real iPhones","Emulator plus real Android phones"]]},
 {h:"Decisions to make early",bullets:["Minimum OS versions to support (affects features and testing effort).","Native or cross-platform (one codebase or two).","Organisation-owned accounts, not personal ones.","Bundle and application IDs: hard to change after release.","Environment builds: dev, staging and production versions that point to different backends (Android 'flavours', iOS 'schemes' or configurations)."]},
 {h:"Key terms",gloss:[["SDK","Software development kit: tools and libraries for a platform"],["IDE","Integrated development environment"],["Simulator / emulator","Software that imitates a phone on a computer"],["Bundle ID / application ID","Unique identifier of an app in the store"],["Gradle","Android build and dependency tool"],["Build flavour / scheme","Different versions of the app from the same code, such as staging and production"],["Minimum SDK / deployment target","Oldest OS version the app supports"]]}
],
quiz:[["Which tool is needed to build iOS apps and what does it run on?","Xcode, which runs on a Mac."],["What is a bundle ID?","The unique identifier of an iOS app, such as com.company.app."],["Why use organisation-owned developer accounts?","So access and ownership don't depend on one person."],["What are build flavours?","Variants of the app, such as staging and production, built from the same code."]],
deeper:["androidArch","flutterArch"]},
{prac:["Request developer account access and device budgets in week one; procurement can take weeks.","Decide minimum OS versions with data on your users' devices."],
 mis:[["Emulators are enough for testing.","Real devices catch performance, camera, network and battery issues emulators miss."],["Identifiers can be changed later.","Changing them means a new app listing; users don't move over automatically."]]});

addTopic({id:"ml03",cat:MOB7,t:"Building the app: screens, APIs, data and device features",d:"Understand",p:"P0",n:"New",h:1.5,
what:"What mobile developers build: screens and navigation, state management, calling backend APIs, storing data on the device, offline support, permissions, push notifications, deep links, and third-party SDKs for analytics and crash reporting.",
why:"Mobile features often depend on device capabilities, permissions and backend APIs. Knowing the parts helps you spot dependencies and platform differences.",
concepts:["Screens and navigation","State management","Networking and API calls","Local storage and offline mode","Permissions (camera, location, notifications)","Push notifications (APNs, FCM)","Deep links","Third-party SDKs"],
learn:["androidLifecycle","androidOffline","androidPerms","fcm","androidLinks"],
doIt:"Pick one feature in a mobile app you use. List the screens, API calls, permissions and notifications it involves.",
prove:"A feature breakdown for a mobile story with iOS, Android and backend tasks agreed with the team.",
interview:"We want to send users a notification when their order ships. What's involved?",
covers:["Mobile development","Push notifications","Offline","Permissions"]},
{sections:[
 {h:"Parts of a mobile app",table:[["Part","What it does","Examples"],["UI and navigation","Screens and moving between them","SwiftUI, Jetpack Compose, Flutter widgets"],["State","Remembers what's on screen and what the user did","ViewModel, Bloc, Redux"],["Networking","Calls backend APIs","URLSession, Retrofit, Dio"],["Local storage","Saves data on the phone","SQLite, Room, Core Data, secure keychain/keystore"],["Device features","Camera, GPS, biometrics, contacts","Platform APIs"],["Notifications","Messages when the app is closed","APNs (Apple), FCM (Firebase Cloud Messaging)"],["Deep links","Open a specific screen from a link","Universal Links (iOS), App Links (Android)"],["SDKs","Ready-made features from others","Analytics, crash reporting, payments, maps"]]},
 {h:"How a push notification reaches a phone",steps:[["Register","The app asks permission and receives a device token."],["Store","The app sends the token to your backend."],["Trigger","An event happens, for example 'order shipped'."],["Send","The backend sends a message to APNs or FCM with the token."],["Deliver","Apple or Google delivers it to the device."]]},
 {h:"Mobile-specific challenges",bullets:["Unreliable networks: handle timeouts and offline mode.","Battery and memory limits: avoid heavy background work.","Permissions can be denied; the app must still work.","App lifecycle: the OS can pause or close the app at any time.","Platform differences between iOS and Android behaviour and design guidelines."]},
 {h:"Key terms",gloss:[["Native","Built with the platform's own language and tools"],["Cross-platform","One codebase for iOS and Android, such as Flutter or React Native"],["APNs","Apple Push Notification service"],["FCM","Firebase Cloud Messaging, Google's push service"],["Device token","ID used to send push notifications to a specific device"],["Deep link","Link that opens a specific screen in the app"],["Offline-first","Design where the app works without a connection and syncs later"],["Permission prompt","OS dialog asking the user to allow access"]]}
],
quiz:[["What is FCM?","Firebase Cloud Messaging, used to send push notifications."],["What does the backend need to send a push notification?","The device token and access to APNs or FCM."],["What is a deep link?","A link that opens a specific screen inside the app."],["Why design for permission denial?","Users can refuse; the app must still work."]],
deeper:["androidOffline","androidPerms","fcm","androidLinks"]},
{prac:["Ask for permission at the moment it's needed, with a clear reason; acceptance rates are higher.","Check iOS and Android designs separately; copying one platform's patterns to the other feels wrong to users."],
 mis:[["Cross-platform means no platform-specific work.","Notifications, permissions, signing and store work still differ per platform."],["Push notifications always arrive.","Delivery isn't guaranteed; don't rely on them for critical information."]]});

addTopic({id:"ml04",cat:MOB7,t:"Testing mobile apps",d:"Understand",p:"P1",n:"New",h:1,
what:"How mobile apps are tested: unit and UI tests, testing on real devices and many OS versions, device farms, network and interruption testing, accessibility checks, and beta testers.",
why:"Device and OS variety makes mobile testing larger than web testing. You'll plan device coverage and decide what 'tested' means for a release.",
concepts:["Unit tests","UI tests (XCUITest, Espresso)","Device and OS coverage","Device farms","Network and interruption testing","Accessibility","Regression before release"],
learn:["testPyramid","crashlytics"],
doIt:"Get your app's device and OS breakdown from analytics. Pick the top devices that cover about 80% of users.",
prove:"A device coverage matrix and release test checklist for your app.",
interview:"How would you decide which devices to test on?",
covers:["Mobile testing","Device coverage"]},
{sections:[
 {h:"Test levels",table:[["Level","Tool examples","Checks"],["Unit","XCTest, JUnit","Logic in isolation"],["UI tests","XCUITest (iOS), Espresso (Android), Appium, Maestro","Screens and flows"],["Manual and exploratory","Real devices","Usability, edge cases"],["Beta","TestFlight, Play testing tracks","Real users, real devices"]]},
 {h:"What makes mobile testing harder",bullets:["Hundreds of device models and screen sizes, especially on Android.","Several OS versions in use at once.","Interruptions: calls, notifications, switching apps, low battery.","Network changes: Wi-Fi to mobile data, airplane mode, slow connections.","Permissions granted or denied.","Upgrade testing: installing the new version over the old one with existing data."]},
 {h:"Device farms",p:["Device farms such as Firebase Test Lab, AWS Device Farm and BrowserStack let teams run tests on many real devices in the cloud. They help coverage without buying every phone."]},
 {h:"Key terms",gloss:[["XCUITest / Espresso","iOS / Android UI test frameworks"],["Appium","Cross-platform mobile test automation tool"],["Device farm","Cloud service with many real devices for testing"],["Fragmentation","Wide variety of devices and OS versions"],["Upgrade test","Installing a new version over an old one"]]}
],
quiz:[["What is a device farm?","A cloud service offering many real devices for testing."],["Why test upgrades from older versions?","Existing data and settings can break with a new version."],["Name an iOS and an Android UI test framework.","XCUITest and Espresso."]],
deeper:["testPyramid","crashlytics"]},
{prac:["Choose test devices from your real user data, not from the team's own phones.","Always include one older, low-memory Android device."],
 mis:[["Testing on the latest phones is enough.","Many users have older or cheaper devices where problems show."],["Simulators behave like phones.","They miss real performance, sensors and network behaviour."]]});

addTopic({id:"ml05",cat:MOB7,t:"Builds, versions and code signing",d:"Understand",p:"P0",n:"New",h:1.5,
what:"How a mobile app becomes an installable, trusted package: debug vs release builds, version name and build number, code signing with certificates, provisioning profiles and keystores, Play App Signing, AAB/APK and IPA files, and mobile CI/CD with tools such as Fastlane.",
why:"Signing and versioning problems block releases at the last minute. Knowing the terms lets you check readiness and ask the right questions.",
concepts:["Debug vs release builds","Version name and build number","Code signing and certificates","Provisioning profiles (iOS)","Keystore and upload key (Android)","Play App Signing","IPA, APK and AAB files","Mobile CI/CD and Fastlane"],
learn:["playSigning","semver","ghActionsQs"],
doIt:"Ask your mobile lead where signing keys and certificates are stored, who can access them and when they expire.",
prove:"A release build checklist: version numbers, signing, environment configuration and upload steps.",
interview:"The release is approved but the build can't be uploaded because of a signing error. What does that mean?",
covers:["Mobile builds","Code signing","Versioning"]},
{sections:[
 {h:"Debug vs release",table:[["Build","Purpose","Notes"],["Debug","Development and testing","Extra logging, slower, signed with a development certificate"],["Release","Store or beta distribution","Optimised, signed for distribution, points to production backend"]]},
 {h:"Two version numbers",table:[["Platform","User-facing version","Internal build number"],["iOS","Version (CFBundleShortVersionString), for example 3.4.0","Build (CFBundleVersion), increases with every upload"],["Android","versionName, for example 3.4.0","versionCode, an integer that must increase with every release"]],p:["The store rejects an upload whose build number isn't higher than the last one."]},
 {h:"Code signing",steps:[["Why","Signing proves the app comes from you and hasn't been changed."],["iOS","A distribution certificate plus a provisioning profile that links the app ID, certificate and allowed devices or store distribution."],["Android","The app is signed with a key stored in a keystore. With Play App Signing, Google holds the app signing key and you sign uploads with an upload key."],["Expiry and loss","iOS certificates expire and need renewing. Losing an Android upload key needs a reset with Google; protect keys carefully."]]},
 {h:"Release files",table:[["File","Platform","Used for"],["IPA","iOS","App package uploaded to App Store Connect"],["AAB (Android App Bundle)","Android","Required format for new apps on Google Play; Google builds optimised APKs per device"],["APK","Android","Installable package, used for direct installs and testing"]]},
 {h:"Mobile CI/CD",p:["Teams automate building, signing and uploading with tools such as Fastlane, Xcode Cloud, Bitrise, Codemagic or GitHub Actions. Automation avoids 'only one person can build the release' risk."]},
 {h:"Key terms",gloss:[["Code signing","Digitally signing an app to prove its origin"],["Certificate","Digital identity used to sign iOS apps"],["Provisioning profile","iOS file linking app, certificate and distribution method"],["Keystore","File holding Android signing keys"],["Play App Signing","Google manages the app signing key"],["versionCode / build number","Internal number that must increase each upload"],["AAB","Android App Bundle, the Play upload format"],["IPA","iOS app archive"],["Fastlane","Tool that automates mobile builds and releases"]]}
],
quiz:[["What must increase with every Android release?","The versionCode."],["What does a provisioning profile do?","Links an iOS app ID, signing certificate and distribution method."],["What file format does Google Play require for new apps?","Android App Bundle (AAB)."],["Why automate mobile builds?","To avoid manual errors and dependence on one person's machine."],["What happens if an iOS distribution certificate expires?","New builds can't be signed until it's renewed."]],
deeper:["playSigning","semver"]},
{prac:["Keep signing keys in a secure shared store with at least two owners.","Put certificate expiry dates on the team calendar."],
 mis:[["Version name and build number are the same thing.","The version is for users; the build number is internal and must always increase."],["Anyone can build the release on their laptop.","Release builds need protected signing keys; use CI."]]});

addTopic({id:"ml06",cat:MOB7,t:"Beta testing: TestFlight and Play testing tracks",d:"Understand",p:"P1",n:"New",h:1,
what:"How teams share pre-release builds with testers before the public: TestFlight internal and external testing on iOS, internal, closed and open testing tracks on Google Play, beta review, feedback and crash data.",
why:"Beta testing catches real-world issues safely. You'll organise beta groups, timelines and feedback loops.",
concepts:["TestFlight internal vs external testers","Beta app review for external testing","Play internal, closed and open testing","Testing requirements for new personal Play accounts","Collecting feedback and crashes","Promoting a build from beta to production"],
learn:["testflight","playTesting"],
doIt:"Find out whether your team uses TestFlight and Play testing tracks, and who is in each tester group.",
prove:"A beta plan: tester groups, build cadence, feedback channel and exit criteria for production.",
interview:"How would you run a beta for a big app redesign?",
covers:["Beta testing","TestFlight","Play testing tracks"]},
{sections:[
 {h:"iOS: TestFlight",table:[["Group","Who","Review needed"],["Internal testers","Members of your App Store Connect team","No"],["External testers","Anyone you invite by email or public link","First build goes through beta app review"]]},
 {h:"Android: Play testing tracks",table:[["Track","Who","Typical use"],["Internal testing","Small trusted group","Fast checks of every build"],["Closed testing","Invited testers or groups","Beta programmes"],["Open testing","Anyone who joins from the store listing","Large public betas"],["Production","All users","Public release, often staged"]],p:["Google requires developers with personal accounts created after 13 November 2023 to meet testing requirements before an app can be published on Google Play."]},
 {h:"Running a good beta",steps:[["Define goals","What you want to learn: stability, usability, performance."],["Pick testers","Mix of devices, OS versions and user types."],["Set cadence","For example a new build every Tuesday."],["Collect feedback","In-app feedback, a form or a chat channel."],["Watch data","Crash-free rate and key metrics in beta."],["Exit criteria","For example crash-free users above 99.5% and no critical bugs."]]},
 {h:"Key terms",gloss:[["TestFlight","Apple's beta testing service"],["Internal tester","Team member testing without review"],["External tester","Outside tester; first build needs beta review"],["Testing track","Google Play channel for a group of testers"],["Promote","Move a tested build to the next track or to production"]]}
],
quiz:[["Do TestFlight internal testers need beta review?","No; external testing needs beta app review for the first build."],["Name Google Play's three testing tracks.","Internal, closed and open testing."],["Give one beta exit criterion.","For example crash-free users above 99.5% or no critical bugs."]],
deeper:["testflight","playTesting"]},
{prac:["Include internal staff from support and sales in betas; they know customer pain points.","Promote the exact build that was beta tested to production."],
 mis:[["Beta is just early access.","It's a structured test with goals and exit criteria."],["Beta feedback is enough without data.","Combine feedback with crash and usage data."]]});

addTopic({id:"ml07",cat:MOB7,t:"Store listing and app review",d:"Understand",p:"P0",n:"New",h:1,
what:"Preparing an app for the stores: listing text, screenshots, app icon, age rating, privacy details (App Store privacy labels, Google Play Data safety form), review guidelines, review notes and demo accounts, common rejection reasons and how to respond.",
why:"Rejections delay launches. A TPM who prepares listings and review information early keeps release dates.",
concepts:["Store listing content","Privacy labels and Data safety","Age ratings","Review guidelines","Demo accounts and review notes","Common rejection reasons","Resolving rejections"],
learn:["appReview","appleHig","masvs"],
doIt:"Read your app's store listing and privacy section as if you were a reviewer. Note anything unclear or out of date.",
prove:"A store submission checklist covering listing, privacy, demo account and review notes for both stores.",
interview:"Apple rejected our update the day before launch. What do you do?",
covers:["Store listing","App review","Privacy labels"]},
{sections:[
 {h:"What you submit",table:[["Item","Notes"],["App name, subtitle, description","Clear, accurate, no misleading claims"],["Screenshots and preview video","Show real app screens for required device sizes"],["App icon","Meets platform rules"],["Category and age rating","Answer the rating questionnaire honestly"],["Privacy information","Apple privacy labels; Google Play Data safety form; privacy policy URL"],["Review notes and demo account","Login details and instructions so reviewers can test"],["Release notes","What's new in this version"]]},
 {h:"Common rejection reasons",bullets:["Crashes or broken features during review.","Reviewer can't log in (no demo account).","Privacy details don't match what the app collects.","Requesting permissions without a clear purpose.","Incomplete information, placeholder content or broken links.","Digital purchases not using the platform's required payment system where rules apply."]},
 {h:"Handling a rejection",steps:[["Read carefully","Find the exact guideline cited."],["Fix or explain","Change the app, or reply with clarification if the reviewer misunderstood."],["Resubmit","Use the resolution centre or reply in the console."],["Appeal","If you disagree, use the platform's appeal process."],["Learn","Add the issue to your submission checklist."]]},
 {h:"Key terms",gloss:[["Store listing","The app's page in the store"],["Privacy label","Apple's summary of data an app collects"],["Data safety","Google Play's section on data collection and sharing"],["Age rating","Content rating based on a questionnaire"],["Review guidelines","Platform rules apps must follow"],["Resolution centre","Where Apple communicates review issues"]]}
],
quiz:[["Why provide a demo account for review?","So reviewers can test features behind login; missing access is a common rejection reason."],["What is Google Play's Data safety form?","A declaration of what data the app collects and shares."],["First step after a rejection?","Read the cited guideline and decide whether to fix or clarify."]],
deeper:["appReview","masvs"]},
{prac:["Prepare listing and privacy content in parallel with development, not on release day.","Keep the demo account working; reviewers come back for every update."],
 mis:[["Review is a formality.","Rejections are common and can delay launches."],["Privacy labels can be filled once.","Update them whenever data collection changes."]]});

addTopic({id:"ml08",cat:MOB7,t:"Release, staged rollout and updates",d:"Understand",p:"P0",n:"New",h:1.5,
what:"How an approved app reaches users safely: manual or automatic release after approval, Apple's phased release, Google Play's staged rollout, halting a rollout, forced and optional updates, over-the-air updates for some cross-platform apps, API compatibility and hotfixes.",
why:"Controlling who gets an update, and how fast, is the main safety tool on mobile. You'll decide rollout plans and what to do when a release goes wrong.",
concepts:["Release timing after approval","Apple phased release","Google Play staged rollout","Halting and resuming","Forced update and minimum version","Over-the-air (OTA) updates","Backend and API versioning","Mobile hotfix process"],
learn:["asPhased","playStaged","easUpdate"],
doIt:"Check whether your team uses phased or staged rollouts and what metrics they watch before increasing.",
prove:"A rollout plan for your next release: percentages, timing, metrics, halt criteria and owners.",
interview:"A new app version is causing crashes for 2% of users. What are your options?",
covers:["Staged rollout","Phased release","Forced update","OTA updates"]},
{sections:[
 {h:"Apple vs Google",table:[["Topic","Apple App Store","Google Play"],["Name","Phased release for automatic updates","Staged rollout"],["How it grows","Fixed 7-day schedule: 1%, 2%, 5%, 10%, 20%, 50%, 100% of users with automatic updates on","You choose the percentage and raise it manually"],["Pause","Pause for up to 30 days in total","Halt the rollout; resume later"],["First release","Only for updates","Only for updates, not first publication"],["Note","Anyone can still update manually from the store","Users who already got the version keep it after a halt"]]},
 {h:"A typical rollout plan",steps:[["Release to a small share","For example 1 to 5%."],["Watch for 24 to 48 hours","Crash-free users, ANRs, key business metrics, reviews."],["Increase","10%, 25%, 50%, 100% if healthy."],["Halt if needed","Stop the rollout if halt criteria are met."],["Fix and replace","Ship a fixed version with a higher build number."]]},
 {h:"Other update tools",table:[["Tool","What it does","Limits"],["Feature flags / remote config","Turn features on or off without a release","Code must already be in the app"],["Forced update","App blocks use below a minimum version and sends users to the store","Use sparingly; frustrating for users"],["OTA updates","Some React Native/Expo apps can update JavaScript code without a store release","Only non-native code; must follow store rules"],["API versioning","Backend supports old and new app versions","Needs planning and retirement dates"]]},
 {h:"Key terms",gloss:[["Phased release","Apple's gradual 7-day rollout of updates"],["Staged rollout","Google Play's percentage-based rollout"],["Halt","Stop a rollout from reaching more users"],["Forced update","Requiring users to update before continuing"],["OTA update","Over-the-air update of app code outside the store, where allowed"],["Minimum supported version","Oldest app version the backend still supports"],["ANR","Android 'application not responding' error"]]}
],
quiz:[["How long is Apple's phased release?","Seven days, from 1% up to 100% of users with automatic updates on."],["Can you use a staged rollout for an app's first release on Google Play?","No, only for updates."],["What happens to users who already installed a halted version?","They keep it until a newer version is released."],["When might you force an update?","For critical security or compatibility issues."],["What can remote config change without a release?","Behaviour or features already built into the app."]],
deeper:["asPhased","playStaged","easUpdate"]},
{prac:["Agree halt criteria before release, for example 'crash-free users below 99.5%'.","Plan API changes so at least the last few app versions keep working."],
 mis:[["Halting a rollout removes the version from phones.","It only stops new users getting it; installed copies remain."],["OTA lets you change anything.","Only certain code can update over the air, within store rules."]]});

addTopic({id:"ml09",cat:MOB7,t:"After launch: crashes, performance and ratings",d:"Understand",p:"P1",n:"New",h:1,
what:"What mobile teams watch after release: crash-free users and sessions, ANRs, app start time, app size, battery use, analytics funnels, store ratings and reviews, app store optimisation (ASO), and keeping up with yearly OS releases.",
why:"Mobile quality shows directly in ratings, which affect downloads. You'll own the post-launch health review and prioritise fixes.",
concepts:["Crash-free users and sessions","ANRs and app hangs","Start-up time and app size","Android vitals and Xcode Organizer","Analytics events and funnels","Ratings, reviews and responses","App store optimisation (ASO)","Annual OS updates"],
learn:["crashlytics","atlMetrics"],
doIt:"Look at your app's crash-free rate, top crash and average rating for the last 30 days.",
prove:"A monthly mobile health report template with crashes, performance, ratings and actions.",
interview:"Our rating dropped from 4.5 to 3.9 after the last release. How would you investigate?",
covers:["Crash reporting","App performance","Ratings","ASO"]},
{sections:[
 {h:"Health metrics",table:[["Metric","Meaning","Typical target"],["Crash-free users","Share of users with no crash in a period","Above 99.5%"],["ANR rate (Android)","App froze for several seconds","As low as possible; Google flags high rates"],["Cold start time","Time to open the app from scratch","A couple of seconds or less"],["App size","Download and install size","Smaller improves installs"],["Rating","Average store rating","4.5 or higher is strong"]]},
 {h:"Where the data comes from",bullets:["Crash reporting: Firebase Crashlytics, Sentry.","Platform consoles: Android vitals in Play Console; Xcode Organizer and App Store Connect for iOS.","Product analytics: Firebase Analytics, Mixpanel, Amplitude.","Store reviews: read and reply in App Store Connect and Play Console."]},
 {h:"Investigating a rating drop",steps:[["Check timing","Did it start with a specific version?"],["Read reviews","Group complaints by theme."],["Check crashes","New top crashes in that version?"],["Check performance","Slower start or more ANRs?"],["Fix and respond","Ship a fix; reply to reviews when fixed."]]},
 {h:"Key terms",gloss:[["Crash-free users","Percentage of users without crashes"],["ANR","Application not responding (Android)"],["Android vitals","Google's quality metrics for Android apps"],["ASO","App store optimisation: improving store visibility and conversion"],["Funnel","Sequence of steps users take, with drop-off at each"],["Cold start","Opening an app that isn't already in memory"]]}
],
quiz:[["What is a good crash-free users target?","Above about 99.5%."],["What is an ANR?","An Android 'application not responding' error when the app freezes."],["What is ASO?","App store optimisation: improving visibility and conversion in the stores."]],
deeper:["crashlytics","atlMetrics"]},
{prac:["Review crash and rating trends in every sprint review.","Test your app on the new iOS and Android betas each summer before the public releases."],
 mis:[["A few crashes don't matter.","Crashes drive bad reviews and uninstalls, and stores consider quality."],["Ratings only reflect features.","Speed, stability and support responses strongly affect ratings."]]});
