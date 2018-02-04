define('ember-bootstrap/components/base/bs-modal', ['exports', 'ember-bootstrap/templates/components/bs-modal', 'ember-bootstrap/mixins/transition-support', 'ember-bootstrap/utils/listen-to-cp', 'ember-bootstrap/utils/transition-end', 'ember-bootstrap/utils/dom'], function (exports, _bsModal, _transitionSupport, _listenToCp, _transitionEnd, _dom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_transitionSupport.default, {
    layout: _bsModal.default,

    /**
     * Visibility of the modal. Toggle to show/hide with CSS transitions.
     *
     * When the modal is closed by user interaction this property will not update by using two-way bindings in order
     * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onHide` action
     *
     * @property open
     * @type boolean
     * @default true
     * @public
     */
    open: true,

    /**
     * @property isOpen
     * @private
     */
    isOpen: (0, _listenToCp.default)('open'),

    /**
     * @property _isOpen
     * @private
     */
    _isOpen: false,

    /**
     * Set to false to disable fade animations.
     *
     * @property fade
     * @type boolean
     * @default true
     * @public
     */
    fade: Ember.computed.not('isFastBoot'),

    /**
     * @property notFade
     * @type boolean
     * @private
     */
    notFade: Ember.computed.not('fade'),

    /**
     * Used to apply Bootstrap's visibility classes.
     *
     * @property showModal
     * @type boolean
     * @default false
     * @private
     */
    showModal: false,

    /**
     * Render modal markup?
     *
     * @property inDom
     * @type boolean
     * @default false
     * @private
     */
    inDom: false,

    /**
     * @property paddingLeft
     * @type number|null
     * @default null
     * @private
     */
    paddingLeft: null,

    /**
     * @property paddingRight
     * @type number|null
     * @default null
     * @private
     */
    paddingRight: null,

    /**
     * Use a semi-transparent modal background to hide the rest of the page.
     *
     * @property backdrop
     * @type boolean
     * @default true
     * @public
     */
    backdrop: true,

    /**
     * @property showBackdrop
     * @type boolean
     * @default false
     * @private
     */
    showBackdrop: false,

    /**
     * Closes the modal when escape key is pressed.
     *
     * @property keyboard
     * @type boolean
     * @default true
     * @public
     */
    keyboard: true,

    /**
     * [BS4 only!] Vertical position, either 'top' (default) or 'center'
     * 'center' will apply the `modal-dialog-centered` class
     *
     * @property position
     * @type {string}
     * @default 'top'
     * @public
     */
    position: 'top',

    /**
     * The id of the `.modal` element.
     *
     * @property modalId
     * @type string
     * @readonly
     * @private
     */
    modalId: Ember.computed('elementId', function () {
      return this.get('elementId') + '-modal';
    }),

    /**
     * The DOM element of the `.modal` element.
     *
     * @property modalElement
     * @type object
     * @readonly
     * @private
     */
    modalElement: Ember.computed('modalId', function () {
      return document.getElementById(this.get('modalId'));
    }).volatile(),

    /**
     * The id of the backdrop element.
     *
     * @property backdropId
     * @type string
     * @readonly
     * @private
     */
    backdropId: Ember.computed('elementId', function () {
      return this.get('elementId') + '-backdrop';
    }),

    /**
     * The DOM element of the backdrop element.
     *
     * @property backdropElement
     * @type object
     * @readonly
     * @private
     */
    backdropElement: Ember.computed('backdropId', function () {
      return document.getElementById(this.get('backdropId'));
    }).volatile(),

    /**
     * The destination DOM element for in-element.
     *
     * @property destinationElement
     * @type object
     * @readonly
     * @private
     */
    destinationElement: Ember.computed(function () {
      var dom = (0, _dom.getDOM)(this);
      return (0, _dom.findElementById)(dom, 'ember-bootstrap-wormhole');
    }).volatile(),

    /**
     * Property for size styling, set to null (default), 'lg' or 'sm'
     *
     * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
     *
     * @property size
     * @type String
     * @public
     */
    size: null,

    /**
     * If true clicking on the backdrop will close the modal.
     *
     * @property backdropClose
     * @type boolean
     * @default true
     * @public
     */
    backdropClose: true,

    /**
     * If true component will render in place, rather than be wormholed.
     *
     * @property renderInPlace
     * @type boolean
     * @default false
     * @public
     */
    renderInPlace: false,

    /**
     * @property _renderInPlace
     * @type boolean
     * @private
     */
    _renderInPlace: Ember.computed('renderInPlace', 'destinationElement', function () {
      return this.get('renderInPlace') || !this.get('destinationElement');
    }),

    /**
     * The duration of the fade transition
     *
     * @property transitionDuration
     * @type number
     * @default 300
     * @public
     */
    transitionDuration: 300,

    /**
     * The duration of the backdrop fade transition
     *
     * @property backdropTransitionDuration
     * @type number
     * @default 150
     * @public
     */
    backdropTransitionDuration: 150,

    /**
     * @property isFastBoot
     * @type {Boolean}
     * @private
     */
    isFastBoot: Ember.computed(function () {
      if (!Ember.getOwner) {
        // Ember.getOwner is available as of Ember 2.3, while FastBoot requires 2.4. So just return false...
        return false;
      }

      var owner = Ember.getOwner(this);
      if (!owner) {
        return false;
      }

      var fastboot = owner.lookup('service:fastboot');
      if (!fastboot) {
        return false;
      }

      return Ember.get(fastboot, 'isFastBoot');
    }),

    /**
     * The action to be sent when the modal footer's submit button (if present) is pressed.
     * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html){{/crossLink}}) this action will
     * not be triggered. Instead a submit event will be triggered on the form itself. See the class description for an
     * example.
     *
     * @property onSubmit
     * @type function
     * @public
     */
    onSubmit: function onSubmit() {},


    /**
     * The action to be sent when the modal is closing.
     * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
     * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
     * time to finish. Use the `onHidden` if you need the modal to be hidden when the action triggers.
     *
     * You can return false to prevent closing the modal automatically, and do that in your action by
     * setting `open` to false.
     *
     * @property onHide
     * @type function
     * @public
     */
    onHide: function onHide() {},


    /**
     * The action to be sent after the modal has been completely hidden (including the CSS transition).
     *
     * @property onHidden
     * @type function
     * @default null
     * @public
     */
    onHidden: function onHidden() {},


    /**
     * The action to be sent when the modal is opening.
     * This will be triggered immediately after the modal is shown (so it's safe to access the DOM for
     * size calculations and the like). This means that if fade=true, it will be shown in between the
     * backdrop animation and the fade animation.
     *
     * @property onShow
     * @type function
     * @default null
     * @public
     */
    onShow: function onShow() {},


    /**
     * The action to be sent after the modal has been completely shown (including the CSS transition).
     *
     * @property onShown
     * @type function
     * @public
     */
    onShown: function onShown() {},


    actions: {
      close: function close() {
        if (this.get('onHide')() !== false) {
          this.set('isOpen', false);
        }
      },
      submit: function submit() {
        // replace modalId by :scope selector if supported by all target browsers
        var modalId = this.get('modalId');
        var forms = this.get('modalElement').querySelectorAll('#' + modalId + ' .modal-body form');
        if (forms.length > 0) {
          // trigger submit event on body forms
          var event = document.createEvent('Events');
          event.initEvent('submit', true, true);
          Array.prototype.slice.call(forms).forEach(function (form) {
            return form.dispatchEvent(event);
          });
        } else {
          // if we have no form, we send a submit action
          this.get('onSubmit')();
        }
      }
    },

    /**
     * Give the modal (or its autofocus element) focus
     *
     * @method takeFocus
     * @private
     */
    takeFocus: function takeFocus() {
      var modalEl = this.get('modalElement');
      var focusElement = modalEl && modalEl.querySelector('[autofocus]');
      if (!focusElement) {
        focusElement = modalEl;
      }
      if (focusElement) {
        focusElement.focus();
      }
    },


    /**
     * Show the modal
     *
     * @method show
     * @private
     */
    show: function show() {
      if (this._isOpen) {
        return;
      }
      this._isOpen = true;

      document.body.classList.add('modal-open');

      this.resize();

      var callback = function callback() {
        var _this = this;

        if (this.get('isDestroyed')) {
          return;
        }

        this.checkScrollbar();
        this.setScrollbar();

        Ember.run.schedule('afterRender', function () {
          var modalEl = _this.get('modalElement');
          if (!modalEl) {
            return;
          }

          modalEl.scrollTop = 0;
          _this.handleUpdate();
          _this.set('showModal', true);
          _this.get('onShow')();

          if (_this.get('usesTransition')) {
            (0, _transitionEnd.default)(_this.get('modalElement'), function () {
              this.takeFocus();
              this.get('onShown')();
            }, _this, _this.get('transitionDuration'));
          } else {
            _this.takeFocus();
            _this.get('onShown')();
          }
        });
      };
      this.set('inDom', true);
      this.handleBackdrop(callback);
    },


    /**
     * Hide the modal
     *
     * @method hide
     * @private
     */
    hide: function hide() {
      if (!this._isOpen) {
        return;
      }
      this._isOpen = false;

      this.resize();
      this.set('showModal', false);

      if (this.get('usesTransition')) {
        (0, _transitionEnd.default)(this.get('modalElement'), this.hideModal, this, this.get('transitionDuration'));
      } else {
        this.hideModal();
      }
    },


    /**
     * Clean up after modal is hidden and call onHidden
     *
     * @method hideModal
     * @private
     */
    hideModal: function hideModal() {
      var _this2 = this;

      if (this.get('isDestroyed')) {
        return;
      }

      this.handleBackdrop(function () {
        document.body.classList.remove('modal-open');
        _this2.resetAdjustments();
        _this2.resetScrollbar();
        _this2.set('inDom', false);
        _this2.get('onHidden')();
      });
    },


    /**
     * SHow/hide the backdrop
     *
     * @method handleBackdrop
     * @param callback
     * @private
     */
    handleBackdrop: function handleBackdrop(callback) {
      var doAnimate = this.get('usesTransition');

      if (this.get('isOpen') && this.get('backdrop')) {
        this.set('showBackdrop', true);

        if (!callback) {
          return;
        }

        Ember.run.schedule('afterRender', this, function () {
          var backdrop = this.get('backdropElement');
          (true && !(backdrop) && Ember.assert('Backdrop element should be in DOM', backdrop));

          if (doAnimate) {
            (0, _transitionEnd.default)(backdrop, callback, this, this.get('backdropTransitionDuration'));
          } else {
            callback.call(this);
          }
        });
      } else if (!this.get('isOpen') && this.get('backdrop')) {
        var backdrop = this.get('backdropElement');
        (true && !(backdrop) && Ember.assert('Backdrop element should be in DOM', backdrop));


        var callbackRemove = function callbackRemove() {
          if (this.get('isDestroyed')) {
            return;
          }
          this.set('showBackdrop', false);
          if (callback) {
            callback.call(this);
          }
        };
        if (doAnimate) {
          (0, _transitionEnd.default)(backdrop, callbackRemove, this, this.get('backdropTransitionDuration'));
        } else {
          callbackRemove.call(this);
        }
      } else if (callback) {
        Ember.run.next(this, callback);
      }
    },


    /**
     * Attach/Detach resize event listeners
     *
     * @method resize
     * @private
     */
    resize: function resize() {
      if (this.get('isOpen')) {
        this._handleUpdate = Ember.run.bind(this, this.handleUpdate);
        window.addEventListener('resize', this._handleUpdate, false);
      } else {
        window.removeEventListener('resize', this._handleUpdate, false);
      }
    },


    /**
     * @method handleUpdate
     * @private
     */
    handleUpdate: function handleUpdate() {
      this.adjustDialog();
    },


    /**
     * @method adjustDialog
     * @private
     */
    adjustDialog: function adjustDialog() {
      var modalIsOverflowing = this.get('modalElement').scrollHeight > document.documentElement.clientHeight;
      this.setProperties({
        paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.get('scrollbarWidth') : null,
        paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.get('scrollbarWidth') : null
      });
    },


    /**
     * @method resetAdjustments
     * @private
     */
    resetAdjustments: function resetAdjustments() {
      this.setProperties({
        paddingLeft: null,
        paddingRight: null
      });
    },


    /**
     * @method checkScrollbar
     * @private
     */
    checkScrollbar: function checkScrollbar() {
      var fullWindowWidth = window.innerWidth;
      if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }

      this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    },


    /**
     * @method setScrollbar
     * @private
     */
    setScrollbar: function setScrollbar() {
      var bodyPad = parseInt(document.body.style.paddingRight || 0, 10);
      this._originalBodyPad = document.body.style.paddingRight || '';
      if (this.bodyIsOverflowing) {
        document.body.style.paddingRight = bodyPad + this.get('scrollbarWidth');
      }
    },


    /**
     * @method resetScrollbar
     * @private
     */
    resetScrollbar: function resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPad;
    },


    /**
     * @property scrollbarWidth
     * @type number
     * @readonly
     * @private
     */
    scrollbarWidth: Ember.computed(function () {
      var scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure';
      var modalEl = this.get('modalElement');
      modalEl.parentNode.insertBefore(scrollDiv, modalEl.nextSibling);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      scrollDiv.parentNode.removeChild(scrollDiv);
      return scrollbarWidth;
    }),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      if (this.get('isOpen')) {
        this.show();
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      window.removeEventListener('resize', this._handleUpdate, false);
      document.body.classList.remove('modal-open');
      this.resetScrollbar();
    },


    _observeOpen: Ember.observer('isOpen', function () {
      if (this.get('isOpen')) {
        this.show();
      } else {
        this.hide();
      }
    }),

    init: function init() {
      this._super.apply(this, arguments);

      var _getProperties = this.getProperties('isOpen', 'backdrop', 'fade', 'isFastBoot'),
          isOpen = _getProperties.isOpen,
          backdrop = _getProperties.backdrop,
          fade = _getProperties.fade,
          isFastBoot = _getProperties.isFastBoot;

      this.setProperties({
        showModal: isOpen && (!fade || isFastBoot),
        showBackdrop: isOpen && backdrop,
        inDom: isOpen
      });
    }
  });
});