<template>
  <BiliobCard title="隐私权政策">
    <VCardActions>
      <VBtn
        text
        outline
        @click="chs = !chs"
      >
        <VIcon>mdi-google-translate</VIcon>中/英切换
      </VBtn>
    </VCardActions>
    <VCardText v-if="chs">
      <p>
        此为Jannchie见齐构建的开源 BiliOB观测者
        web应用程序。该服务由Jannchie免费提供，并按原样使用。
      </p>
      <p>
        本页用于告知观测者有关我收集、使用和披露个人信息的相关政策。
      </p>
      <p>
        如果您选择使用我的服务，那么您同意收集和使用与本政策相关的信息。我所收集的个人信息将用于提供和改进服务。除本隐私政策所述外，我不会与任何人使用或共享您的信息。
      </p>
      <p>
        除非本隐私政策中另有定义，否则本隐私政策中使用的术语与我们的条款和条件具有相同的含义。
      </p>
      <p><strong>信息收集与使用</strong></p>
      <p>
        为了更好的体验，在使用我们的服务时，我可能会要求您向我们提供某些个人身份信息，包括但不限于使用浏览器、浏览记录等。我请求的信息将保留在您的设备上，我不会以任何方式收集这些信息。
      </p>
      <p>
        该应用程序使用了第三方服务，可能会收集用于识别您的信息。
      </p>
      <div>
        <p>
          Link to privacy policy of third party service providers used by the
          app
        </p>
        <ul>
          <!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!---->
        </ul>
      </div>
      <p><strong>日志记录</strong></p>
      <p>
        我想通知您，每当您使用我的服务时，如果应用程序出现错误，我都会通过第三方产品（称为第三方数据）在您的手机上收集数据和信息。该日志数据可能包含诸如您的设备Internet协议（“
        IP”）地址，设备名称，操作系统版本，使用“我的服务”时应用程序的配置，您使用该服务的时间和日期以及其他统计信息之类的信息。
        。
      </p>
      <p><strong>Cookies</strong></p>
      <p>
        Cookies是具有少量数据的文件，通常用作匿名唯一标识符。这些信息将从您访问的网站发送到浏览器，并存储在设备的内存中。
      </p>
      <p>
        本服务使用了这些
        cookies。并且，该应用程序使用了第三方代码，他们也可能通过cookies来收集信息并改善其服务。您可以选择接受还是拒绝这些cookie，并知道何时将cookie发送到您的设备。如果您选择拒绝我们的cookie，则可能无法使用本服务的某些部分。
      </p>
      <p><strong>服务供应商</strong></p>
      <p>
        由于以下原因，我可能会雇用第三方公司和个人：
      </p>
      <ul>
        <li>促进我们的服务；</li>
        <li>代表我们提供服务；</li>
        <li>执行与服务有关的服务；</li>
        <li>帮助我们分析如何使用我们的服务</li>
      </ul>
      <p>
        我想通知此服务的用户，这些第三方有权访问您的个人信息。原因是代表我们执行分配给他们的任务。但是，他们有义务不出于任何其他目的披露或使用该信息。
      </p>
      <p><strong>安全</strong></p>
      <p>
        我重视您在向我们提供您的个人信息方面的信任，因此我们正在努力使用商业上可接受的保护方式。但是请记住，互联网上的传输方法或电子存储方法都不是100％安全可靠的，并且我不能保证其绝对安全。
      </p>
      <p><strong>外链</strong></p>
      <p>
        该服务可能包含指向其他站点的链接。如果单击第三方链接，您将被定向到该站点。请注意，这些外部站点不是由我操作的。因此，我强烈建议您阅读这些网站的隐私政策。我无法控制任何第三方站点或服务的内容，隐私权政策或行为，也不承担任何责任。
      </p>
      <p><strong>儿童隐私</strong></p>
      <p>
        这些服务不针对13岁以下的任何人。我不会有意收集13岁以下儿童的个人身份信息。如果我发现13岁以下的儿童为我提供了个人信息，我会立即从我们的服务器中删除这些信息。如果您是父母或监护人，并且您知道孩子已向我们提供了个人信息，请与我联系，以便我能够采取必要的措施。
      </p>
      <p><strong>本隐私政策的变更</strong></p>
      <p>
        我可能会不时更新我们的隐私政策。因此，建议您定期查看此页面以进行任何更改。我会通过在此页面上发布新的隐私政策来通知您任何更改。这些更改在此页面上发布后立即生效。
      </p>
      <p><strong>联系我</strong></p>
      <p>
        如果您对我的隐私政策有任何疑问或建议，请随时通过jannchie@gmail.com与我联系。
      </p>
    </VCardText>
    <VCardText v-else>
      <p>
        Jannchie built the BiliOB web app as an Open Source app. This SERVICE is
        provided by Jannchie at no cost and is intended for use as is.
      </p>
      <p>
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service.
      </p>
      <p>
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </p>
      <p>
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at BiliOB unless otherwise
        defined in this Privacy Policy.
      </p>
      <p><strong>Information Collection and Use</strong></p>
      <p>
        For a better experience, while using our Service, I may require you to
        provide us with certain personally identifiable information, including
        but not limited to view history, browser information. The information
        that I request will be retained on your device and is not collected by
        me in any way.
      </p>
      <p>
        The app does use third party services that may collect information used
        to identify you.
      </p>
      <div>
        <p>
          Link to privacy policy of third party service providers used by the
          app
        </p>
        <ul>
          <!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!---->
        </ul>
      </div>
      <p><strong>Log Data</strong></p>
      <p>
        I want to inform you that whenever you use my Service, in a case of an
        error in the app I collect data and information (through third party
        products) on your phone called Log Data. This Log Data may include
        information such as your device Internet Protocol (“IP”) address, device
        name, operating system version, the configuration of the app when
        utilizing my Service, the time and date of your use of the Service, and
        other statistics.
      </p>
      <p><strong>Cookies</strong></p>
      <p>
        Cookies are files with a small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        websites that you visit and are stored on your device's internal memory.
      </p>
      <p>
        This Service does not use these “cookies” explicitly. However, the app
        may use third party code and libraries that use “cookies” to collect
        information and improve their services. You have the option to either
        accept or refuse these cookies and know when a cookie is being sent to
        your device. If you choose to refuse our cookies, you may not be able to
        use some portions of this Service.
      </p>
      <p><strong>Service Providers</strong></p>
      <p>
        I may employ third-party companies and individuals due to the following
        reasons:
      </p>
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <p>
        I want to inform users of this Service that these third parties have
        access to your Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </p>
      <p><strong>Security</strong></p>
      <p>
        I value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and I cannot guarantee
        its absolute security.
      </p>
      <p><strong>Links to Other Sites</strong></p>
      <p>
        This Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by me. Therefore, I strongly advise you
        to review the Privacy Policy of these websites. I have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </p>
      <p><strong>Children’s Privacy</strong></p>
      <p>
        These Services do not address anyone under the age of 13. I do not
        knowingly collect personally identifiable information from children
        under 13. In the case I discover that a child under 13 has provided me
        with personal information, I immediately delete this from our servers.
        If you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact me so that I will
        be able to do necessary actions.
      </p>
      <p><strong>Changes to This Privacy Policy</strong></p>
      <p>
        I may update our Privacy Policy from time to time. Thus, you are advised
        to review this page periodically for any changes. I will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately after they are posted on this page.
      </p>
      <p><strong>Contact Us</strong></p>
      <p>
        If you have any questions or suggestions about my Privacy Policy, do not
        hesitate to contact me.
      </p>
      <p>
        This privacy policy page was created at
        <a
          href="https://privacypolicytemplate.net"
          target="_blank"
        >privacypolicytemplate.net</a>
        and modified/generated by
        <a
          href="https://app-privacy-policy-generator.firebaseapp.com/"
          target="_blank"
        >App Privacy Policy Generator</a>
      </p>
    </VCardText>
  </BiliobCard>
</template>

<script>
export default {
  data() {
    return {
      chs: true
    };
  }
};
</script>

<style></style>
