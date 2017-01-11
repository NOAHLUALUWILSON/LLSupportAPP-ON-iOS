var _back = mui.back;
			mui.back = function() {
				if (showMenu) {
					closeMenu();
				} else {
					_back();
				}
			};