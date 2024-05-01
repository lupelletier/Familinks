# ~~~~~~~~~~~~~~~ Utility functions ~~~~~~~~~~~~~~~~~~~~~~~~
# logging helper function to set color depending on level
log_to_terminal() {
	local LEVEL=$1
	shift
	local NO_NEW_LINE=false
	local NO_PREFIX=false
 
	# read optional parameters --no-new-line and --no-prefix
	while [[ $# -gt 0 ]]; do
		case $1 in
		--no-new-line)
			NO_NEW_LINE=true
			shift
			;;
		--no-prefix)
			NO_PREFIX=true
			shift
			;;
		# if no match, stop reading arguments and exit for loop
		*)
			MESSAGE="$*"
			break
			;;
		esac
	done
 
	# Colors
	# utility to display all available colors: curl -s https://gist.githubusercontent.com/HaleTom/89ffe32783f89f403bba96bd7bcd1263/raw/e50a28ec54188d2413518788de6c6367ffcea4f7/print256colours.sh | bash
	local PREF='\e[38;5;'
	local RED="${PREF}9m"
	local YELLOW="${PREF}11m"
	local GREEN="${PREF}10m"
	local DEBUG="${PREF}200m"
 
	local NC="\e[0m"
 
	case $LEVEL in
	debug | DEBUG)
		COLOR=$DEBUG
		;;
	info | INFO)
		COLOR=$GREEN
		;;
	warning | WARNING)
		COLOR=$YELLOW
		;;
	error | ERROR)
		COLOR=$RED
		;;
	esac
 
	local PREFIX=""
	[ "$NO_PREFIX" = "false" ] && PREFIX="${LEVEL}:\t"
	[ "$NO_NEW_LINE" = "false" ] && MESSAGE="$MESSAGE\n"
	#tabs 10
	echo -e -n "${COLOR}${PREFIX}${MESSAGE}${NC}"
	#tabs -0
 
}
 
log_info() {
	log_to_terminal info $@
}
 
log_warning() {
	log_to_terminal warning $@
}
 
log_error() {
	log_to_terminal error $@
}
 
log_debug() {
	[ ! -z "$DEBUG" ] && log_to_terminal debug $@
}